"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="font-display text-3xl text-cream mb-3">Thank you.</div>
        <p className="text-sm text-muted">We'll be in touch shortly.</p>
      </motion.div>
    );
  }

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-8">
        <div>
          <label
            htmlFor="name"
            className="block text-[10px] tracking-[0.3em] uppercase text-muted mb-3"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-cream placeholder-muted/30 focus:outline-none focus:border-gold transition-colors duration-500 text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[10px] tracking-[0.3em] uppercase text-muted mb-3"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-cream placeholder-muted/30 focus:outline-none focus:border-gold transition-colors duration-500 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-[10px] tracking-[0.3em] uppercase text-muted mb-3"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-cream placeholder-muted/30 focus:outline-none focus:border-gold transition-colors duration-500 resize-none text-sm"
            placeholder="Tell us about your project"
          />
        </div>
        <button
          type="submit"
          className="group flex items-center gap-4 mt-4"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-cream group-hover:text-gold transition-colors duration-500">
            Submit Inquiry
          </span>
          <div className="h-px w-12 bg-gold/40 group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
        </button>
      </form>
    </ScrollReveal>
  );
}
