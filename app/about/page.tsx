"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Code2, Heart } from "lucide-react";
import { personalInfo, education, awards, skills } from "@/lib/resume-data";
import FadeUp from "@/components/animations/FadeUp";
import FloatingElement from "@/components/animations/FloatingElement";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto">
              Developer, problem solver, and lifelong learner
            </p>
          </div>
        </FadeUp>

        {/* Bio Section */}
        <FadeUp delay={0.1}>
          <div className="frosting-card p-8 mb-12 relative overflow-hidden">
            <FloatingElement className="absolute top-4 right-4" duration={8}>
              <Heart className="w-12 h-12 text-macaron-pink/20" />
            </FloatingElement>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold mb-6">Hello there! 👋</h2>
              <div className="prose prose-lg max-w-none text-chocolate-400 space-y-4">
                <p>{personalInfo.bio}</p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or enjoying a good cup of coffee (preferably a latte, to match my website theme! ☕).
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating delightful user experiences. 
                  Every project is an opportunity to learn something new and push the boundaries of what's possible on the web.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Education Section */}
        <FadeUp delay={0.2}>
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
              <GraduationCap className="w-8 h-8 mr-3 text-macaron-lavender" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="frosting-card p-6"
                >
                  <h3 className="text-xl font-display font-bold text-chocolate mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-macaron-pink font-semibold mb-2">{edu.institution}</p>
                  <p className="text-chocolate-300 text-sm mb-3">{edu.period}</p>
                  {edu.honors && (
                    <div className="space-y-1">
                      {edu.honors.map((honor, hIndex) => (
                        <p key={hIndex} className="text-chocolate-400 text-sm flex items-center">
                          <span className="text-macaron-pink mr-2">●</span>
                          {honor}
                        </p>
                      ))}
                    </div>
                  )}
                  {edu.gpa && (
                    <p className="text-chocolate-400 text-sm mt-2">
                      <strong>GPA:</strong> {edu.gpa}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Awards Section */}
        <FadeUp delay={0.3}>
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
              <Award className="w-8 h-8 mr-3 text-macaron-pink" />
              Awards & Honors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="frosting-card p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-macaron-pink/20 text-macaron-pink mb-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-chocolate mb-2">
                    {award.title}
                  </h3>
                  <p className="text-macaron-lavender font-semibold text-sm mb-2">
                    {award.organization}
                  </p>
                  <p className="text-chocolate-300 text-sm mb-2">{award.year}</p>
                  {award.description && (
                    <p className="text-chocolate-400 text-xs">{award.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Skills Section */}
        <FadeUp delay={0.4}>
          <div>
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
              <Code2 className="w-8 h-8 mr-3 text-macaron-pistachio" />
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="frosting-card p-6"
                >
                  <h3 className="text-lg font-display font-bold text-chocolate mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-macaron-pink/10 to-macaron-lavender/10 text-chocolate-400 text-sm font-medium border border-macaron-pink/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* CTA Section */}
        <FadeUp delay={0.5}>
          <div className="mt-16 text-center">
            <div className="frosting-card p-8 inline-block">
              <h3 className="text-2xl font-display font-bold mb-4">
                Let's connect and create something amazing!
              </h3>
              <p className="text-chocolate-300 mb-6">
                I'm always open to discussing new projects and opportunities
              </p>
              <a href="/contact" className="dessert-button">
                Get in Touch
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

