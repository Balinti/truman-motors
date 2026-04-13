"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { assetPath } from "@/lib/basePath";

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
  speed?: number;
  id?: string;
}

export default function ParallaxSection({
  children,
  backgroundImage,
  className = "",
  speed = 0.3,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-20 -bottom-20"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${assetPath(backgroundImage)})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
