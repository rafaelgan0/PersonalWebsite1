"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Palette, ChevronDown } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";
import FloatingElement from "@/components/animations/FloatingElement";
import FadeUp from "@/components/animations/FadeUp";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} duration={8} yOffset={-30} className="absolute top-20 left-10">
            <div className="w-20 h-20 rounded-full bg-macaron-pink/20 blur-2xl" />
          </FloatingElement>
          <FloatingElement delay={1} duration={10} yOffset={-40} className="absolute top-40 right-20">
            <div className="w-32 h-32 rounded-full bg-macaron-lavender/20 blur-3xl" />
          </FloatingElement>
          <FloatingElement delay={2} duration={7} yOffset={-25} className="absolute bottom-40 left-1/4">
            <div className="w-24 h-24 rounded-full bg-macaron-pistachio/20 blur-2xl" />
          </FloatingElement>
          <FloatingElement delay={0.5} duration={9} yOffset={-35} className="absolute top-60 right-1/3">
            <Sparkles className="w-12 h-12 text-macaron-pink/30" />
          </FloatingElement>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-macaron-pink/10 text-macaron-pink text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-6"
            >
              Hi, I'm{" "}
              <span className="gradient-text">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl text-chocolate-400 font-display mb-8"
            >
              {personalInfo.role}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-chocolate-300 max-w-3xl mx-auto mb-12"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/projects" className="dessert-button group">
                View My Work
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-macaron border-2 border-macaron-pink text-macaron-pink font-medium hover:bg-macaron-pink hover:text-white transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-chocolate-300"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-gradient-to-b from-latte to-latte-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">
              What I Do
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeUp delay={0.1}>
              <div className="frosting-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-macaron-pink/20 text-macaron-pink mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Full-Stack Development</h3>
                <p className="text-chocolate-300">
                  Building modern web applications with React, Next.js, TypeScript, and Node.js
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="frosting-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-macaron-lavender/20 text-macaron-lavender mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">UI/UX Design</h3>
                <p className="text-chocolate-300">
                  Creating beautiful, intuitive interfaces with attention to detail and user experience
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="frosting-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-macaron-pistachio/20 text-macaron-pistachio mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Creative Solutions</h3>
                <p className="text-chocolate-300">
                  Solving complex problems with innovative approaches and clean, maintainable code
                </p>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="text-center mt-12">
              <Link href="/about" className="text-macaron-pink hover:text-macaron-lavender font-medium inline-flex items-center group">
                Learn more about me
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

