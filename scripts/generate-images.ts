/**
 * generate-images.ts
 * Generates Nano Banana keyframe images via Gemini API.
 *
 * Processes images ONE AT A TIME with a configurable delay between calls,
 * and rate-limit-aware backoff. This avoids hitting Gemini's free-tier
 * rate limits (~10 req/min on image gen).
 *
 * Reads prompts from:
 *   - prompts/scene-N/start.txt      (scene keyframes)
 *   - prompts/scene-N/end.txt
 *   - prompts/section-*.txt          (static section images, Archetype G)
 *   - prompts/service-*.txt          (per-service card images, Archetype G)
 *
 * Writes images to:
 *   - public/frames-source/scene-N-{start,end}.jpg
 *   - public/section-*.jpg
 *   - public/service-*.jpg
 *
 * Usage:
 *   tsx scripts/generate-images.ts
 *
 * Required env:
 *   GEMINI_API_KEY
 *
 * Optional env:
 *   IMAGE_DELAY_MS      — ms between successful calls (default 7000)
 *   IMAGE_MAX_RETRIES   — retries per image on failure (default 3)
 *   IMAGE_SKIP_EXISTING — set to "false" to regenerate even if file exists (default true)
 */

import { GoogleGenAI } from "@google/genai";
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { storageReady, uploadBytes, recordImage } from "./_storage";
import { join } from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("✗ GEMINI_API_KEY not set. Export it first:");
  console.error("    export GEMINI_API_KEY=your_key_here");
  process.exit(1);
}

const MODEL = "gemini-3.1-flash-image-preview";
const ASPECT = "16:9";
const DELAY_MS = parseInt(process.env.IMAGE_DELAY_MS ?? "7000", 10);
const MAX_RETRIES = parseInt(process.env.IMAGE_MAX_RETRIES ?? "3", 10);
const SKIP_EXISTING = (process.env.IMAGE_SKIP_EXISTING ?? "true") !== "false";

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

async function generateImage(prompt: string): Promise<Buffer> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: ASPECT } },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  const imagePart = parts?.find((p: any) => p.inlineData);
  if (!imagePart?.inlineData) {
    throw new Error("No image in API response");
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function generateWithRetry(prompt: string, label: string): Promise<Buffer> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await generateImage(prompt);
    } catch (err: any) {
      const rateLimited = isRateLimitError(err);
      const backoffMs = rateLimited
        ? 60_000 * attempt // 60s, 120s, 180s — rate-limit aware
        : 3_000 * attempt; //  3s,   6s,   9s — generic retry

      if (attempt === MAX_RETRIES) {
        throw new Error(`${label}: ${err.message ?? err}`);
      }

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

/**
 * Build full job list (scene keyframes + section images + service images).
 */
async function collectJobs() {
  const jobs: { promptPath: string; outPath: string; label: string }[] = [];
  const promptsDir = "prompts";
  const frameSrcDir = "public/frames-source";
  const publicDir = "public";

  let entries: string[];
  try {
    entries = await readdir(promptsDir);
  } catch {
    console.error(`✗ prompts/ directory not found. Nothing to generate.`);
    return jobs;
  }

  // 1. Scene keyframes (archetypes A, B, D, F, G hero)
  const sceneDirs = entries.filter((d) => d.startsWith("scene-")).sort();
  for (const scene of sceneDirs) {
    for (const frameType of ["start", "end"] as const) {
      const promptPath = join(promptsDir, scene, `${frameType}.txt`);
      const outPath = join(frameSrcDir, `${scene}-${frameType}.jpg`);
      if (await fileExists(promptPath)) {
        jobs.push({ promptPath, outPath, label: `${scene}/${frameType}` });
      }
    }
  }

  // 2. Section + service images (archetype G static sections)
  const flatPrompts = entries.filter(
    (f) => (f.startsWith("section-") || f.startsWith("service-")) && f.endsWith(".txt")
  );
  for (const file of flatPrompts) {
    const base = file.replace(/\.txt$/, "");
    jobs.push({
      promptPath: join(promptsDir, file),
      outPath: join(publicDir, `${base}.jpg`),
      label: base,
    });
  }

  return jobs;
}

async function main() {
  console.log("\n🎨 Image Generation (Nano Banana)");
  console.log(`   Model: ${MODEL}`);
  console.log(
    `   Delay between calls: ${DELAY_MS}ms (~${(60000 / DELAY_MS).toFixed(1)} req/min)`
  );
  console.log(`   Max retries: ${MAX_RETRIES}`);
  console.log(`   Skip existing: ${SKIP_EXISTING}\n`);

  await mkdir("public/frames-source", { recursive: true });
  await mkdir("public", { recursive: true });

  const jobs = await collectJobs();
  if (jobs.length === 0) {
    console.log("No prompts found. Run the skill first to generate prompts.");
    return;
  }

  console.log(`Found ${jobs.length} image(s) to generate.\n`);

  let totalCost = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const progress = `[${i + 1}/${jobs.length}]`;

    // Skip existing
    if (SKIP_EXISTING && (await fileExists(job.outPath))) {
      console.log(`${progress} ⏭  ${job.label} — already exists, skipping`);
      skipped++;
      continue;
    }

    // Read prompt
    let prompt: string;
    try {
      prompt = await readFile(job.promptPath, "utf-8");
    } catch (err: any) {
      console.error(`${progress} ✗ ${job.label} — prompt file missing: ${job.promptPath}`);
      failed++;
      continue;
    }

    console.log(`${progress} → ${job.label}`);

    try {
      const img = await generateWithRetry(prompt, job.label);
      await writeFile(job.outPath, img);
      const sizeKB = (img.length / 1024).toFixed(1);

      // Upload to Supabase Storage in parallel — generated sites use the
      // CDN URL (via content/asset-manifest.json), so the local public/
      // copy is just a dev artifact (gitignored).
      // Storage key: section/service images → images/{slot}.jpg, scene
      // keyframes → frames-source/{slot}.jpg.
      if (storageReady()) {
        const slot = job.outPath.split("/").pop()!.replace(/\.jpg$/, "");
        const kind = job.outPath.includes("frames-source/") ? "frames-source" : "images";
        const key = `${kind}/${slot}.jpg`;
        try {
          const url = await uploadBytes(img, key);
          if (url) {
            // Manifest only records section/service "slot → URL" pairs —
            // scene keyframes are intermediate artifacts used by Veo, the
            // agent doesn't reference them directly in siteConfig.
            if (kind === "images") await recordImage(slot, url);
            console.log(`${progress} ⤴  ${slot} → Storage`);
          }
        } catch (uErr: any) {
          console.warn(`${progress} ⚠  Storage upload failed for ${slot}: ${uErr.message}`);
        }
      }

      console.log(`${progress} ✓ ${job.label} (${sizeKB} KB)`);
      generated++;
      totalCost += 0.03;

      // Rate-limit-friendly delay between successful calls (skip after last)
      if (i < jobs.length - 1) {
        console.log(`        waiting ${(DELAY_MS / 1000).toFixed(1)}s...`);
        await sleep(DELAY_MS);
      }
    } catch (err: any) {
      console.error(`${progress} ✗ ${job.label} — ${err.message}`);
      failed++;
      // On failure, pause — we may have tripped a rate limit
      await sleep(DELAY_MS);
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✓ Done.`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Cost:      ~$${totalCost.toFixed(2)}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (failed > 0) {
    console.log(
      "Some images failed. Re-run the same command — it will skip successful ones and retry only the failures.\n"
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
