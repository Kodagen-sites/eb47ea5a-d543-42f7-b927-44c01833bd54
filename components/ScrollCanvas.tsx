"use client";

/**
 * ScrollCanvas
 * Scroll-scrubbed frame sequence renderer. Pinned canvas + GSAP ScrollTrigger.
 *
 * Works for Archetypes A (24s dolly), B (8s object), D (narrative).
 * Not used by Archetypes C, E, F.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  frameCount: number;
  pattern?: string;
  padLength?: number;
  scrollDistance?: number;
  snapPoints?: number[];
  children?: React.ReactNode;
  onProgress?: (progress: number) => void;
};

export default function ScrollCanvas({
  frameCount,
  pattern = "/frames/frame_{n}.jpg",
  padLength = 4,
  scrollDistance = 6,
  snapPoints,
  children,
  onProgress,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ current: 0 });

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;
    let cancelled = false;

    const buildUrl = (i: number) => {
      const n = String(i + 1).padStart(padLength, "0");
      return pattern.replace("{n}", n);
    };

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (cancelled) return;
          images[i] = img;
          loadedCount++;
          setLoaded(loadedCount);
          resolve();
        };
        img.src = buildUrl(i);
      });

    (async () => {
      const firstBatch = Math.min(30, frameCount);
      await Promise.all(
        Array.from({ length: firstBatch }, (_, i) => loadOne(i))
      );
      if (cancelled) return;
      imagesRef.current = images;
      setReady(true);

      const queue = Array.from(
        { length: frameCount - firstBatch },
        (_, i) => i + firstBatch
      );
      const workers = Array.from({ length: 8 }, async () => {
        while (queue.length && !cancelled) {
          const idx = queue.shift()!;
          await loadOne(idx);
        }
      });
      await Promise.all(workers);
    })();

    return () => {
      cancelled = true;
    };
  }, [frameCount, pattern, padLength]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(frameStateRef.current.current);
    };

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.width) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);

    const state = frameStateRef.current;
    const isMobile = window.innerWidth < 768;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      snap: isMobile || !snapPoints
        ? undefined
        : {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut",
          },
      onUpdate: (self) => {
        const target = Math.min(
          frameCount - 1,
          Math.floor(self.progress * (frameCount - 1))
        );
        if (target !== state.current) {
          state.current = target;
          draw(target);
        }
        onProgress?.(self.progress);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, [ready, frameCount, scrollDistance, snapPoints, onProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ background: "var(--bg-color, #000)" }}
      />

      {!ready && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg text-white"
          style={{ height: "100dvh" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
              Loading cinematic
            </div>
            <div className="h-px w-48 overflow-hidden bg-white/10">
              <div
                className="h-full bg-white transition-[width] duration-150"
                style={{
                  width: `${Math.round((loaded / frameCount) * 100)}%`,
                }}
              />
            </div>
            <div className="font-mono text-[10px] text-white/40">
              {loaded} / {frameCount}
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}
