"use client";

import { useRef, useEffect } from "react";

interface HeroVideoProps {
  src: string;
  fallbackImage?: string;
}

export default function HeroVideo({ src, fallbackImage }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — silent fail, fallback image shows via poster
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={fallbackImage}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </section>
  );
}
