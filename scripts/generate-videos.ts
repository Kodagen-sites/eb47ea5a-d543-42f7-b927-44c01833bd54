/**
 * generate-videos.ts
 * Generates Veo 3.1 Lite video clips from start/end keyframes.
 *
 * Processes one video at a time, polling until completion, with rate-limit
 * aware retry and optional pause between successful clips.
 *
 * Reads:
 *   - prompts/scene-N/motion.txt
 *   - public/frames-source/scene-N-start.jpg
 *   - public/frames-source/scene-N-end.jpg
 *
 * Writes:
 *   - raw/scene-N.mp4
 *
 * Usage:
 *   tsx scripts/generate-videos.ts
 *
 * Required env:
 *   GEMINI_API_KEY
 *
 * Optional env:
 *   VEO_RESOLUTION       — 720p (default) or 1080p
 *   VEO_DELAY_MS         — ms to wait between successful clips (default 5000)
 *   VEO_MAX_RETRIES      — retries per clip on failure (default 2)
 *   VEO_SKIP_EXISTING    — set to "false" to regenerate even if file exists (default true)
 *   VEO_POLL_INTERVAL_MS — how often to poll the operation (default 8000)
 */

import { GoogleGenAI } from "@google/genai";
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { storageReady, uploadBytes, recordVideo } from "./_storage";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("✗ GEMINI_API_KEY not set. Export it first:");
  console.error("    export GEMINI_API_KEY=your_key_here");
  process.exit(1);
}

const MODEL = "veo-3.1-lite-generate-preview";
const RESOLUTION = (process.env.VEO_RESOLUTION ?? "720p") as "720p" | "1080p";
const ASPECT = "16:9";
const DELAY_MS = parseInt(process.env.VEO_DELAY_MS ?? "5000", 10);
const MAX_RETRIES = parseInt(process.env.VEO_MAX_RETRIES ?? "2", 10);
const SKIP_EXISTING = (process.env.VEO_SKIP_EXISTING ?? "true") !== "false";
const POLL_INTERVAL_MS = parseInt(process.env.VEO_POLL_INTERVAL_MS ?? "8000", 10);

const costPerVideo = RESOLUTION === "720p" ? 1.45 : 2.75;

const ai = new GoogleGenAI({ apiKey: API_KEY });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function isRateLimitError(err: any): boolean {
  const msg = String(err?.message ?? err ?? "").toLowerCase();
  return (
    msg.includes("429") ||
    msg.includes("rate") ||
    msg.includes("quota") ||
    msg.includes("resource_exhausted") ||
    msg.includes("resource has been exhausted")
  );
}

async function generateVideoOnce(
  motionPrompt: string,
  startFrame: Buffer,
  endFrame: Buffer
): Promise<Buffer> {
  const params: any = {
    model: MODEL,
    prompt: motionPrompt,
    image: {
      imageBytes: startFrame.toString("base64"),
      mimeType: "image/jpeg",
    },
    config: {
      numberOfVideos: 1,
      resolution: RESOLUTION,
      aspectRatio: ASPECT,
      lastFrame: {
        imageBytes: endFrame.toString("base64"),
        mimeType: "image/jpeg",
      },
    },
  };

  let operation: any = await (ai.models as any).generateVideos(params);

  // Poll — Veo takes 30s-3min per clip
  let pollCount = 0;
  while (!operation.done) {
    await sleep(POLL_INTERVAL_MS);
    operation = await (ai.operations as any).getVideosOperation({ operation });
    pollCount++;
    if (pollCount % 3 === 0) {
      process.stdout.write(` (${pollCount * (POLL_INTERVAL_MS / 1000)}s)`);
    } else {
      process.stdout.write(".");
    }
  }
  process.stdout.write("\n");

  if (operation.error) {
    throw new Error(operation.error.message || "Veo generation failed");
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("no video URI in response");

  const response = await fetch(downloadLink, {
    method: "GET",
    headers: { "x-goog-api-key": API_KEY },
  });

  if (!response.ok) throw new Error(`video fetch failed: ${response.status}`);
  const arrayBuf = await response.arrayBuffer();
  return Buffer.from(arrayBuf);
}

async function generateWithRetry(
  motionPrompt: string,
  startFrame: Buffer,
  endFrame: Buffer,
  label: string
): Promise<Buffer> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await generateVideoOnce(motionPrompt, startFrame, endFrame);
    } catch (err: any) {
      const rateLimited = isRateLimitError(err);
      if (attempt === MAX_RETRIES) {
        throw new Error(`${label}: ${err.message ?? err}`);
      }
      const backoffMs = rateLimited ? 90_000 * attempt : 10_000 * attempt;
      console.warn(
        `  attempt ${attempt}/${MAX_RETRIES} failed${rateLimited ? " (rate limit)" : ""}: ${
          err.message ?? err
        }`
      );
      console.warn(`  waiting ${(backoffMs / 1000).toFixed(0)}s before retry...`);
      await sleep(backoffMs);
    }
  }
  throw new Error("unreachable");
}

// ── Text-to-video (product rotation, no keyframes needed) ─────────────────

async function generateRotationVideoOnce(textPrompt: string): Promise<Buffer> {
  const params: any = {
    model: MODEL,
    prompt: textPrompt,
    config: {
      numberOfVideos: 1,
      resolution: RESOLUTION,
      aspectRatio: "1:1",   // square — best for product cards
      durationSeconds: 6,   // short seamless loop
    },
  };

  let operation: any = await (ai.models as any).generateVideos(params);

  let pollCount = 0;
  while (!operation.done) {
    await sleep(POLL_INTERVAL_MS);
    operation = await (ai.operations as any).getVideosOperation({ operation });
    pollCount++;
    if (pollCount % 3 === 0) {
      process.stdout.write(` (${pollCount * (POLL_INTERVAL_MS / 1000)}s)`);
    } else {
      process.stdout.write(".");
    }
  }
  process.stdout.write("\n");

  if (operation.error) throw new Error(operation.error.message || "Veo generation failed");

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("no video URI in response");

  const response = await fetch(downloadLink, {
    method: "GET",
    headers: { "x-goog-api-key": API_KEY },
  });
  if (!response.ok) throw new Error(`video fetch failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function generateRotationWithRetry(
  textPrompt: string,
  label: string
): Promise<Buffer> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await generateRotationVideoOnce(textPrompt);
    } catch (err: any) {
      const rateLimited = isRateLimitError(err);
      if (attempt === MAX_RETRIES) throw new Error(`${label}: ${err.message ?? err}`);
      const backoffMs = rateLimited ? 90_000 * attempt : 10_000 * attempt;
      console.warn(`  attempt ${attempt}/${MAX_RETRIES} failed${rateLimited ? " (rate limit)" : ""}: ${err.message ?? err}`);
      console.warn(`  waiting ${(backoffMs / 1000).toFixed(0)}s before retry...`);
      await sleep(backoffMs);
    }
  }
  throw new Error("unreachable");
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🎬 Video Generation (Veo 3.1 Lite)");
  console.log(`   Resolution: ${RESOLUTION} (~$${costPerVideo}/clip)`);
  console.log(`   Delay between clips: ${DELAY_MS}ms`);
  console.log(`   Max retries: ${MAX_RETRIES}`);
  console.log(`   Skip existing: ${SKIP_EXISTING}\n`);

  const promptsDir = "prompts";
  const framesDir = "public/frames-source";
  const rawDir = "raw";
  await mkdir(rawDir, { recursive: true });

  let sceneDirs: string[];
  try {
    sceneDirs = (await readdir(promptsDir))
      .filter((d) => d.startsWith("scene-"))
      .sort();
  } catch {
    console.error("✗ prompts/ directory not found.");
    return;
  }

  if (sceneDirs.length === 0) {
    console.log("No scenes to generate.");
    return;
  }

  console.log(`Found ${sceneDirs.length} scene(s) to process.\n`);

  let totalCost = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < sceneDirs.length; i++) {
    const scene = sceneDirs[i];
    const progress = `[${i + 1}/${sceneDirs.length}]`;
    const outPath = join(rawDir, `${scene}.mp4`);
    const motionPath = join(promptsDir, scene, "motion.txt");
    const startPath = join(framesDir, `${scene}-start.jpg`);
    const endPath = join(framesDir, `${scene}-end.jpg`);

    // Skip existing
    if (SKIP_EXISTING && (await fileExists(outPath))) {
      console.log(`${progress} ⏭  ${scene} — already exists, skipping`);
      skipped++;
      continue;
    }

    // Verify inputs exist
    if (!(await fileExists(motionPath))) {
      console.error(`${progress} ✗ ${scene} — missing ${motionPath}`);
      failed++;
      continue;
    }
    if (!(await fileExists(startPath)) || !(await fileExists(endPath))) {
      console.error(
        `${progress} ✗ ${scene} — missing keyframes. Run 'tsx scripts/generate-images.ts' first.`
      );
      failed++;
      continue;
    }

    console.log(`${progress} → ${scene} (generating + polling)...`);

    try {
      const [motionPrompt, startFrame, endFrame] = await Promise.all([
        readFile(motionPath, "utf-8"),
        readFile(startPath),
        readFile(endPath),
      ]);

      process.stdout.write(`  polling`);
      const video = await generateWithRetry(motionPrompt, startFrame, endFrame, scene);

      await writeFile(outPath, video);
      const sizeKB = (video.length / 1024).toFixed(0);

      // Upload to Storage. Generated sites reference video via the manifest
      // (siteConfig.heroVideoUrl). Local raw/scene-N.mp4 is gitignored.
      if (storageReady()) {
        try {
          const url = await uploadBytes(video, `videos/${scene}.mp4`);
          if (url) {
            await recordVideo(scene, url);
            console.log(`${progress} ⤴  ${scene} → Storage`);
          }
        } catch (uErr: any) {
          console.warn(`${progress} ⚠  Storage upload failed for ${scene}: ${uErr.message}`);
        }
      }

      console.log(`${progress} ✓ ${scene} (${sizeKB} KB)`);
      generated++;
      totalCost += costPerVideo;

      // Delay between successful clips
      if (i < sceneDirs.length - 1) {
        console.log(`        waiting ${(DELAY_MS / 1000).toFixed(1)}s before next clip...`);
        await sleep(DELAY_MS);
      }
    } catch (err: any) {
      console.error(`${progress} ✗ ${scene} — ${err.message}`);
      failed++;
      console.error(`        Continuing to next scene. Retry this one later with the same command.`);
      await sleep(DELAY_MS);
    }
  }

  // ── Product rotation videos (prompts/rotate-*.txt → public/rotate-*.mp4) ──

  let rotateFiles: string[] = [];
  try {
    rotateFiles = (await readdir(promptsDir))
      .filter((f) => f.startsWith("rotate-") && f.endsWith(".txt"))
      .sort();
  } catch { /* promptsDir already verified above */ }

  if (rotateFiles.length > 0) {
    console.log(`\n🔄 Product rotation videos: ${rotateFiles.length} found\n`);
    await mkdir("public", { recursive: true });

    for (let i = 0; i < rotateFiles.length; i++) {
      const file = rotateFiles[i];
      const slug = file.replace(/^rotate-/, "").replace(/\.txt$/, "");
      const progress = `[${i + 1}/${rotateFiles.length}]`;
      const outPath = `public/rotate-${slug}.mp4`;
      const promptPath = join(promptsDir, file);

      if (SKIP_EXISTING && (await fileExists(outPath))) {
        console.log(`${progress} ⏭  rotate-${slug} — already exists, skipping`);
        skipped++;
        continue;
      }

      console.log(`${progress} → rotate-${slug} (text-to-video, 6s square loop)...`);

      try {
        const textPrompt = await readFile(promptPath, "utf-8");
        process.stdout.write(`  polling`);
        const video = await generateRotationWithRetry(textPrompt.trim(), `rotate-${slug}`);
        await writeFile(outPath, video);
        const sizeKB = (video.length / 1024).toFixed(0);
        console.log(`${progress} ✓ rotate-${slug} (${sizeKB} KB) → ${outPath}`);
        generated++;
        totalCost += costPerVideo;

        if (i < rotateFiles.length - 1) {
          console.log(`        waiting ${(DELAY_MS / 1000).toFixed(1)}s...`);
          await sleep(DELAY_MS);
        }
      } catch (err: any) {
        console.error(`${progress} ✗ rotate-${slug} — ${err.message}`);
        failed++;
        await sleep(DELAY_MS);
      }
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✓ Video generation complete.`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Cost:      ~$${totalCost.toFixed(2)}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (generated > 0 && failed === 0) {
    console.log("Next steps:");
    console.log("  npm run stitch       # concat scenes into raw/final.mp4");
    console.log("  npm run frames       # extract frames for scroll canvas");
    console.log("");
  }

  if (failed > 0) {
    console.log(
      "Some scenes failed. Re-run the same command — it skips successful ones and retries failures.\n"
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
