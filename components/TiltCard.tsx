"use client";

import { useRef, useCallback, useEffect, useState, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      if (highlightRef.current) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        highlightRef.current.style.background = `radial-gradient(600px circle at ${pctX}% ${pctY}%, rgba(201, 168, 76, 0.12), transparent 40%)`;
        highlightRef.current.style.opacity = "1";
      }
    },
    [maxTilt, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (highlightRef.current) {
      highlightRef.current.style.opacity = "0";
    }
  }, [isTouchDevice]);

  // On touch devices, render children directly — no tilt wrapper
  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-100 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        ref={highlightRef}
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 transition-opacity duration-300 z-10"
      />
    </div>
  );
}
