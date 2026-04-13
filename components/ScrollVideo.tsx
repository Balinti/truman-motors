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

  // Draw frame on canvas
  const drawFrame = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[Math.round(idx)];
      if (!canvas || !img || !img.complete) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
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

  return (
    <div ref={wrapRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
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
