"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxSection from "@/components/ParallaxSection";
import ParallaxLayer from "@/components/ParallaxLayer";
import AnimatedStats from "@/components/AnimatedStats";
import ModelCard from "@/components/ModelCard";
import ContactForm from "@/components/ContactForm";
import HologramCard from "@/components/HologramCard";
import ScrollVideo from "@/components/ScrollVideo";

const stats = [
  { value: "44", suffix: '"', label: "Inch Tires" },
  { value: "450", label: "Horsepower", suffix: " HP" },
  { value: "175", prefix: "$", suffix: "K", label: "Starting At" },
  { value: "100", suffix: "%", label: "Custom Built" },
];

const pillars = [
  {
    number: "01",
    title: "Built For Anything",
    description:
      "Designed to be the most capable and versatile truck on any road — can be further customized for any use case.",
  },
  {
    number: "02",
    title: "Quality Obsessed",
    description:
      "Committed to the highest quality parts, engineering standards, and assembly — no exceptions.",
  },
  {
    number: "03",
    title: "White Glove Service",
    description:
      "Dedicated project lead, weekly updates & documentation, prompt issue resolution & communication.",
  },
  {
    number: "04",
    title: "Elevated Design",
    description:
      "Streamlined and enhanced parts with custom designs — precision in every interior and exterior detail.",
  },
];

function StaggerText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4 + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function ParallaxWatermark({ text, speed = 0.3 }: { text: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const x = useTransform(scrollYProgress, [0, 1], [-30 * speed, 30 * speed]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        style={{ y, x }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[30vw] font-black text-white/[0.015] whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}

function FloatingAccent({ className, speed = 0.4 }: { className: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y }} className={className} />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 1.1]);

  return (
    <main>
      {/* ━━━ Hero ━━━ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-screen"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <HeroVideo
            src="/videos/hero.mp4"
            fallbackImage="/images/truck-hero.jpg"
          />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute font-display text-[20vw] font-black text-white pointer-events-none select-none"
          >
            TM
          </motion.div>

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-6 text-center"
            >
              Performance Upfitting
            </motion.p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center leading-[0.9]">
              <StaggerText text="TRUMAN" />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] font-light"
              >
                MOTORS
              </motion.span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">
                Scroll
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ━━━ Scroll Build Sequence ━━━ */}
      <ScrollVideo
        frameDir="/frames"
        frameCount={121}
        frameExt=".jpg"
        height="400vh"
      >
        <div className="text-center px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            The Build Process
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-tight">
            From Frame<br />To Finish
          </h2>
        </div>
      </ScrollVideo>

      {/* ━━━ Brand Intro ━━━ */}
      <section id="about" className="relative py-40 md:py-56 overflow-hidden">
        {/* Floating parallax accents */}
        <FloatingAccent
          speed={0.5}
          className="absolute top-20 right-0 w-px h-64 bg-gradient-to-b from-gold/20 to-transparent"
        />
        <FloatingAccent
          speed={0.3}
          className="absolute bottom-10 left-16 w-px h-48 bg-gradient-to-t from-gold/10 to-transparent"
        />
        <FloatingAccent
          speed={0.6}
          className="absolute top-1/3 right-12 w-24 h-px bg-gradient-to-l from-gold/10 to-transparent"
        />

        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 md:gap-12 items-start">
            {/* Left — label, moves slower */}
            <div className="md:col-span-3">
              <ParallaxLayer speed={0.15}>
                <ScrollReveal>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                    Our Philosophy
                  </p>
                  <hr className="hr-gold !mx-0" />
                </ScrollReveal>
              </ParallaxLayer>
            </div>

            {/* Right — big text, moves faster for split-speed effect */}
            <div className="md:col-span-9">
              <ParallaxLayer speed={-0.08}>
                <ScrollReveal delay={0.1}>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-10">
                    Built For
                    <br />
                    <span className="text-gradient">Anything.</span>
                  </h2>
                </ScrollReveal>
              </ParallaxLayer>
              <ParallaxLayer speed={-0.04}>
                <ScrollReveal delay={0.25}>
                  <p className="text-base md:text-lg text-muted max-w-xl leading-relaxed">
                    Truman Motors upfits heavy-duty trucks into the most capable,
                    versatile, and refined vehicles on or off the road — delivering
                    superior performance for work, play, and everything in between.
                  </p>
                </ScrollReveal>
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Stats ━━━ */}
      <ParallaxSection
        backgroundImage="/images/truck-shorty.jpg"
        className="py-28 md:py-40"
        speed={0.3}
      >
        <div className="max-w-5xl mx-auto px-8">
          <AnimatedStats stats={stats} />
        </div>
      </ParallaxSection>

      {/* ━━━ Full-bleed quote break ━━━ */}
      <ParallaxSection
        backgroundImage="/images/truck-hero.jpg"
        className="py-56 md:py-72"
        speed={0.5}
      >
        <div className="max-w-4xl mx-auto px-8 text-center">
          <ParallaxLayer speed={-0.15}>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium italic leading-tight text-cream">
                &ldquo;No compromises.<br />No shortcuts.<br />
                Just the best.&rdquo;
              </h2>
            </ScrollReveal>
          </ParallaxLayer>
        </div>
      </ParallaxSection>

      {/* ━━━ Hologram Showcase ━━━ */}
      <section className="relative py-36 md:py-48 bg-background overflow-hidden">
        {/* Floating gold lines */}
        <FloatingAccent
          speed={0.4}
          className="absolute top-16 left-8 w-32 h-px bg-gradient-to-r from-gold/15 to-transparent"
        />
        <FloatingAccent
          speed={0.6}
          className="absolute bottom-24 right-12 w-20 h-px bg-gradient-to-l from-gold/10 to-transparent"
        />

        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Precision Engineering
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-medium">
                Every Detail Matters
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <HologramCard
                backgroundSrc="/images/hologram/background.png"
                characterSrc="/images/truck-hero.jpg"
                foregroundSrc="/images/hologram/foreground.png"
                width={400}
                height={540}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━ Models ━━━ */}
      <section id="models" className="relative py-36 md:py-52 bg-background overflow-hidden">
        <FloatingAccent
          speed={0.35}
          className="absolute top-32 left-0 w-px h-40 bg-gradient-to-b from-gold/15 to-transparent"
        />

        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
            <div>
              <ScrollReveal>
                <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                  Our Models
                </p>
              </ScrollReveal>
              <ParallaxLayer speed={-0.06}>
                <ScrollReveal delay={0.1}>
                  <h2 className="font-display text-3xl md:text-4xl font-medium">
                    Choose Your Build
                  </h2>
                </ScrollReveal>
              </ParallaxLayer>
            </div>
            <ScrollReveal delay={0.2}>
              <p className="text-sm md:text-base text-muted max-w-xs">
                Two distinct platforms, one uncompromising standard.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <ModelCard
              name="The Shorty"
              tagline="Weekend Warrior"
              description="2-door, short bed Ford F-450 on 44-inch tires. Compact, agile, and built for hauling, adventures, and weekend cruising."
              image="/images/truck-shorty.jpg"
              href="/shorty"
              price="$175K"
              highlight="2-Door · Short Bed"
            />
            <ModelCard
              name="The Signature"
              tagline="All Around Athlete"
              description="4-door, full size Ford F-450 with super single conversion, liquid spring suspension, and 44-inch tires."
              image="/images/truck-signature.jpg"
              href="/signature"
              price="$175K"
              highlight="4-Door · Full Size"
              imagePosition="left center"
            />
          </div>
        </div>
      </section>

      {/* ━━━ Process / 4 Pillars ━━━ */}
      <section id="process" className="relative py-36 md:py-52 bg-charcoal overflow-hidden">
        {/* Parallax watermark that drifts on scroll */}
        <ParallaxWatermark text="TRUMAN" speed={0.5} />

        {/* Floating accent lines */}
        <FloatingAccent
          speed={0.5}
          className="absolute top-24 right-8 w-16 h-px bg-gradient-to-l from-gold/10 to-transparent"
        />
        <FloatingAccent
          speed={0.35}
          className="absolute bottom-32 left-4 w-px h-32 bg-gradient-to-t from-gold/8 to-transparent"
        />

        <div className="relative max-w-6xl mx-auto px-8">
          <div className="mb-24">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Our Approach
              </p>
              <hr className="hr-gold !mx-0 mb-10" />
            </ScrollReveal>
            <ParallaxLayer speed={-0.1}>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl font-medium max-w-md">
                  The Truman Standard
                </h2>
              </ScrollReveal>
            </ParallaxLayer>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="relative border border-white/10 rounded-sm p-10 md:p-12 group hover:border-gold/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 h-full">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl md:text-4xl text-gold/30 group-hover:text-gold/60 transition-colors duration-700 leading-none shrink-0">
                      {pillar.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">
                        {pillar.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Pre-contact parallax break ━━━ */}
      <ParallaxSection
        backgroundImage="/images/truck-hero.jpg"
        className="py-48 md:py-64"
        speed={0.4}
      >
        <div className="max-w-3xl mx-auto px-8 text-center">
          <ParallaxLayer speed={-0.12}>
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                Ready to Build Yours?
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-cream">
                Your Truck.<br />Your Way.
              </h2>
            </ScrollReveal>
          </ParallaxLayer>
        </div>
      </ParallaxSection>

      {/* ━━━ Contact ━━━ */}
      <section id="contact" className="relative py-40 md:py-56 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <FloatingAccent
          speed={0.3}
          className="absolute top-20 right-16 w-px h-24 bg-gradient-to-b from-gold/10 to-transparent"
        />

        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-20">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Get In Touch
              </p>
            </ScrollReveal>
            <ParallaxLayer speed={-0.08}>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl font-medium">
                  Let&apos;s Talk
                </h2>
              </ScrollReveal>
            </ParallaxLayer>
            <ScrollReveal delay={0.2}>
              <p className="text-muted mt-6 text-base max-w-md mx-auto">
                Speak with someone from our team about your next build.
              </p>
            </ScrollReveal>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="py-16 pb-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-sm tracking-[0.2em] uppercase text-muted">
            Truman Motors
          </span>
          <p className="text-xs text-muted/50 tracking-wider">
            &copy; {new Date().getFullYear()} Truman Motors. All rights reserved.
          </p>
          <p className="text-xs text-muted/50 tracking-wider uppercase">
            Performance Truck Upfitting
          </p>
        </div>
      </footer>
    </main>
  );
}
