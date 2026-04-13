"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import HeroVideo from "@/components/HeroVideo";
import ContactForm from "@/components/ContactForm";
import { assetPath } from "@/lib/basePath";

const specs = [
  { label: "Base Vehicle", value: "Ford F-450 Super Duty" },
  { label: "Configuration", value: "4-Door, Full Size" },
  { label: "Tires", value: '44" Off-Road' },
  { label: "Suspension", value: "Liquid Spring" },
  { label: "Conversion", value: "Super Single" },
  { label: "Bumpers", value: "Custom Steel Front & Rear" },
  { label: "Starting Price", value: "$175,000" },
];

export default function SignaturePage() {
  return (
    <main>
      {/* Hero — video */}
      <section className="relative h-[85vh]">
        <HeroVideo
          src="/videos/signature.mp4"
          fallbackImage="/images/truck-signature.jpg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 z-10 px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gold mb-3"
          >
            All Around Athlete
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium"
          >
            The Signature
          </motion.h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-28 bg-background">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <ScrollReveal>
            <p className="text-base md:text-lg text-muted leading-relaxed">
              4-door, full size Ford F-450 with a super single conversion,
              liquid spring suspension, and 44-inch tires. The Signature is the
              ultimate all-around performer — equally at home on the highway, the
              job site, or the trail.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Specs */}
      <section className="py-28 bg-charcoal">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-8">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Specifications
            </p>
            <hr className="hr-gold !mx-0 mb-12" />
          </ScrollReveal>
          <div>
            {specs.map((spec, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-center justify-between py-5 border-b border-white/5">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
                    {spec.label}
                  </span>
                  <span className="font-display text-lg font-medium">
                    {spec.value}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Gallery
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-3 mt-8">
            {["/images/truck-signature.jpg", "/images/truman-logo.png"].map(
              (src, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <Image
                      src={assetPath(src)}
                      alt={`Signature gallery ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                </ScrollReveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-medium mb-12">
              Interested in The Signature?
            </h2>
          </ScrollReveal>
          <ContactForm />
        </div>
      </section>

      {/* Back */}
      <div className="py-10 text-center border-t border-white/5">
        <Link
          href="/"
          className="text-[10px] tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors duration-500"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
