"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/lib/resume-data";
import { formatMarkdownBold } from "@/lib/utils";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              My <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto">
              2+ years of professional experience building modern web applications
            </p>
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-macaron-pink via-macaron-lavender to-macaron-pistachio transform md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <FadeUp key={index} delay={index * 0.2}>
                <div className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-macaron-pink to-macaron-lavender transform md:-translate-x-1/2 md:translate-y-6 z-10 ring-4 ring-latte" />

                  {/* Content Card */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="frosting-card p-6 shadow-chocolate"
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-display font-bold text-chocolate mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center text-macaron-pink font-semibold mb-3">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {exp.company}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-chocolate-300">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, hIndex) => {
                          const parts = formatMarkdownBold(highlight);
                          return (
                            <li key={hIndex} className="flex items-start text-chocolate-400">
                              <span className="text-macaron-pink mr-2 mt-1.5">●</span>
                              <span>
                                {parts.map((part, pIndex) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return (
                                      <strong key={pIndex} className="text-chocolate font-semibold">
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return <span key={pIndex}>{part}</span>;
                                })}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="px-3 py-1 rounded-full bg-gradient-to-r from-macaron-pink/10 to-macaron-lavender/10 text-chocolate-400 text-xs font-medium border border-macaron-pink/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <FadeUp delay={0.4}>
          <div className="mt-16 text-center">
            <div className="frosting-card p-8 inline-block">
              <h3 className="text-2xl font-display font-bold mb-4">
                Interested in working together?
              </h3>
              <p className="text-chocolate-300 mb-6">
                Let's create something amazing!
              </p>
              <a
                href="/contact"
                className="dessert-button"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

