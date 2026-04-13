"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/basePath";

interface HologramCardProps {
  backgroundSrc: string;
  characterSrc: string;
  foregroundSrc: string;
  width?: number;
  height?: number;
}

export default function HologramCard({
  backgroundSrc,
  characterSrc,
  foregroundSrc,
  width = 360,
  height = 540,
}: HologramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const clientX =
        "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalX = Math.max(
        -1,
        Math.min(1, (clientX - centerX) / (rect.width / 2))
      );
      const normalY = Math.max(
        -1,
        Math.min(1, (clientY - centerY) / (rect.height / 2))
      );

      card.style.transform = `rotateX(${-normalY * 15}deg) rotateY(${normalX * 15}deg)`;

      if (bgRef.current)
        bgRef.current.style.transform = `translateX(${normalX * -8}px) translateY(${normalY * -8}px) scale(1.1)`;
      if (charRef.current)
        charRef.current.style.transform = `translateX(${normalX * -15}px) translateY(${normalY * -15}px) scale(1.05)`;
      if (fgRef.current)
        fgRef.current.style.transform = `translateX(${normalX * -25}px) translateY(${normalY * -25}px) scale(1.15)`;

      if (shineRef.current) {
        const shineX = ((clientX - rect.left) / rect.width) * 100;
        const shineY = ((clientY - rect.top) / rect.height) * 100;
        shineRef.current.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(201, 168, 76, 0.2) 0%, rgba(201, 168, 76, 0.06) 30%, transparent 70%)`;
      }
    },
    []
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (bgRef.current)
      bgRef.current.style.transform = "translateX(0) translateY(0) scale(1.1)";
    if (charRef.current)
      charRef.current.style.transform =
        "translateX(0) translateY(0) scale(1.05)";
    if (fgRef.current)
      fgRef.current.style.transform =
        "translateX(0) translateY(0) scale(1.15)";
    if (shineRef.current) shineRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-lg cursor-default"
        style={{
          width,
          height,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          boxShadow:
            "0 0 40px rgba(201, 168, 76, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Background layer */}
        <div
          ref={bgRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 1,
            transform: "scale(1.1)",
            transition: "transform 0.15s ease-out",
          }}
        >
          <Image
            src={assetPath(backgroundSrc)}
            alt=""
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Character/truck layer */}
        <div
          ref={charRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 2,
            transform: "scale(1.05)",
            transition: "transform 0.15s ease-out",
          }}
        >
          <Image
            src={assetPath(characterSrc)}
            alt=""
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Foreground glow layer */}
        <div
          ref={fgRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 3,
            transform: "scale(1.15)",
            transition: "transform 0.15s ease-out",
            mixBlendMode: "screen",
            opacity: 0.7,
          }}
        >
          <Image
            src={assetPath(foregroundSrc)}
            alt=""
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Shine overlay */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ zIndex: 4, transition: "background 0.2s ease-out" }}
        />

        {/* Edge glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            zIndex: 5,
            border: "1px solid rgba(201, 168, 76, 0.2)",
            boxShadow: "inset 0 0 30px rgba(201, 168, 76, 0.05)",
          }}
        />
      </div>
    </div>
  );
}
