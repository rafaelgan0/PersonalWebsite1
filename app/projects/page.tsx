"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { projects } from "@/lib/resume-data";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto">
              A collection of projects I've built with passion and attention to detail
            </p>
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="frosting-card-hover overflow-hidden group"
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-macaron-pink/20 via-macaron-lavender/20 to-macaron-pistachio/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-macaron-lavender/40 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 to-transparent" />
                
                {/* Links Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-frosting-cream/90 backdrop-blur-sm text-chocolate hover:text-macaron-pink transition-colors"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-frosting-cream/90 backdrop-blur-sm text-chocolate hover:text-macaron-pink transition-colors"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-chocolate mb-3 group-hover:text-macaron-pink transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-chocolate-300 mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {project.highlights.slice(0, 3).map((highlight, hIndex) => {
                    const parts = highlight.split(/(\*\*.*?\*\*)/).filter(Boolean);
                    return (
                      <li key={hIndex} className="flex items-start text-sm text-chocolate-400">
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

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${
                          ['#ffb3d9', '#c5b9e6', '#b8d8ba', '#ffd6ba', '#c3f0d3'][tIndex % 5]
                        }20, ${
                          ['#ffb3d9', '#c5b9e6', '#b8d8ba', '#ffd6ba', '#c3f0d3'][(tIndex + 1) % 5]
                        }20)`,
                        border: `1px solid ${
                          ['#ffb3d9', '#c5b9e6', '#b8d8ba', '#ffd6ba', '#c3f0d3'][tIndex % 5]
                        }40`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Links */}
                <div className="mt-6 pt-6 border-t border-chocolate-100 flex gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-macaron-pink to-macaron-lavender text-white text-sm font-medium hover:shadow-dessert transition-all"
                    >
                      View Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 rounded-lg border-2 border-macaron-lavender text-macaron-lavender text-sm font-medium hover:bg-macaron-lavender hover:text-white transition-all"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA Section */}
        <FadeUp delay={0.4}>
          <div className="mt-16 text-center">
            <div className="frosting-card p-8 inline-block">
              <h3 className="text-2xl font-display font-bold mb-4">
                Want to see more of my work?
              </h3>
              <p className="text-chocolate-300 mb-6">
                Check out my GitHub for additional projects and contributions
              </p>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="dessert-button inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                Visit My GitHub
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

