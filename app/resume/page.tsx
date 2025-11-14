"use client";

import { motion } from "framer-motion";
import { Download, FileText, Briefcase, Code2, GraduationCap, Award } from "lucide-react";
import { personalInfo, experiences, projects, education, awards, skills } from "@/lib/resume-data";
import FadeUp from "@/components/animations/FadeUp";

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              My <span className="gradient-text">Resume</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto mb-8">
              A comprehensive overview of my experience, skills, and education
            </p>
            
            {/* Download Button */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="dessert-button inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Resume
            </motion.a>
          </div>
        </FadeUp>

        {/* Resume Content */}
        <div className="space-y-12">
          {/* Professional Summary */}
          <FadeUp delay={0.1}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-macaron-pink mr-3" />
                <h2 className="text-2xl font-display font-bold">Professional Summary</h2>
              </div>
              <p className="text-chocolate-400 leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
          </FadeUp>

          {/* Experience */}
          <FadeUp delay={0.2}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-macaron-lavender mr-3" />
                <h2 className="text-2xl font-display font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className={index > 0 ? "pt-6 border-t border-chocolate-100" : ""}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-display font-bold text-chocolate">{exp.role}</h3>
                        <p className="text-macaron-pink font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-sm text-chocolate-300 mt-2 sm:mt-0 sm:text-right">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-3">
                      {exp.highlights.map((highlight, hIndex) => {
                        const parts = highlight.split(/(\*\*.*?\*\*)/).filter(Boolean);
                        return (
                          <li key={hIndex} className="flex items-start text-chocolate-400 text-sm">
                            <span className="text-macaron-pink mr-2 mt-1">●</span>
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
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          className="px-2 py-1 rounded-full bg-latte-200 text-chocolate-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Skills */}
          <FadeUp delay={0.3}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-6">
                <Code2 className="w-6 h-6 text-macaron-pistachio mr-3" />
                <h2 className="text-2xl font-display font-bold">Technical Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-chocolate mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-macaron-pink/10 to-macaron-lavender/10 text-chocolate-400 text-sm border border-macaron-pink/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Education */}
          <FadeUp delay={0.4}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-macaron-lavender mr-3" />
                <h2 className="text-2xl font-display font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className={index > 0 ? "pt-6 border-t border-chocolate-100" : ""}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-display font-bold text-chocolate">{edu.degree}</h3>
                        <p className="text-macaron-pink font-semibold">{edu.institution}</p>
                      </div>
                      <p className="text-sm text-chocolate-300 mt-1 sm:mt-0">{edu.period}</p>
                    </div>
                    {edu.honors && (
                      <ul className="space-y-1 mb-2">
                        {edu.honors.map((honor, hIndex) => (
                          <li key={hIndex} className="text-chocolate-400 text-sm flex items-center">
                            <span className="text-macaron-pink mr-2">●</span>
                            {honor}
                          </li>
                        ))}
                      </ul>
                    )}
                    {edu.gpa && (
                      <p className="text-chocolate-400 text-sm">
                        <strong>GPA:</strong> {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Awards */}
          <FadeUp delay={0.5}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-macaron-pink mr-3" />
                <h2 className="text-2xl font-display font-bold">Awards & Honors</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {awards.map((award, index) => (
                  <div key={index} className="p-4 rounded-lg bg-latte-100">
                    <h3 className="font-semibold text-chocolate mb-1">{award.title}</h3>
                    <p className="text-macaron-lavender text-sm font-medium mb-1">{award.organization}</p>
                    <p className="text-chocolate-300 text-xs">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.6}>
          <div className="mt-12 text-center frosting-card p-8">
            <h3 className="text-2xl font-display font-bold mb-4">
              Interested in working together?
            </h3>
            <p className="text-chocolate-300 mb-6">
              Download my full resume or get in touch to discuss opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                className="dessert-button inline-flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </motion.a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-macaron border-2 border-macaron-pink text-macaron-pink font-medium hover:bg-macaron-pink hover:text-white transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

