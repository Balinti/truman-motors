"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assetPath } from "@/lib/basePath";
import TiltCard from "./TiltCard";

interface ModelCardProps {
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  price: string;
  highlight?: string;
}

export default function ModelCard({
  name,
  tagline,
  description,
  image,
  href,
  price,
  highlight,
}: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={href} className="group block relative">
        <TiltCard>
        <div className="overflow-hidden bg-charcoal border border-white/5 group-hover:border-gold/20 transition-colors duration-700">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={assetPath(image)}
              alt={name}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            {/* Price badge */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 border border-white/10">
              <span className="text-xs tracking-[0.2em] uppercase text-gold">
                From {price}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gold/70 mb-3">
              {tagline}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
              {name}
            </h3>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-5">
              {description}
            </p>
            {highlight && (
              <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-6">
                {highlight}
              </p>
            )}
            <div className="flex items-center gap-3 text-cream/50 group-hover:text-gold transition-colors duration-500">
              <span className="text-xs tracking-[0.2em] uppercase">
                Explore
              </span>
              <div className="h-px w-8 bg-current group-hover:w-12 transition-all duration-500" />
            </div>
          </div>
        </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}
