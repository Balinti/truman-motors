"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { assetPath } from "@/lib/basePath";

interface ScrollVideoProps {
  frameDir: string;
  frameCount: number;
  frameExt?: string;
  framePad?: number;
  height?: string;
  children?: React.ReactNode;
}

export default function ScrollVideo({
  frameDir,
  frameCount,
  frameExt = ".jpg",
  framePad = 4,
  height = "500vh",
  children,
}: ScrollVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, frameCount - 1]
  );

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(framePad, "0");
      img.src = assetPath(`${frameDir}/f${num}${frameExt}`);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameDir, frameCount, frameExt, framePad]);

  // Draw frame on canvas with "cover" behavior (crop to fill)
  const drawFrame = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[Math.round(idx)];
      if (!canvas || !img || !img.complete) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Match canvas to viewport size
      const dpr = window.devicePixelRatio || 1;
      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      ctx.scale(dpr, dpr);

      // "object-cover" math: scale image to fill, then center-crop
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = vw / vh;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas — fit height, crop sides
        drawH = vh;
        drawW = vh * imgRatio;
        drawX = (vw - drawW) / 2;
        drawY = 0;
      } else {
        // Image is taller than canvas — fit width, crop top/bottom
        drawW = vw;
        drawH = vw / imgRatio;
        drawX = 0;
        drawY = (vh - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Redraw on resize
  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => drawFrame(Math.round(frameIndex.get()));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, drawFrame, frameIndex]);

  return (
    <div ref={wrapRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        {/* Children overlay */}
        {children && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
