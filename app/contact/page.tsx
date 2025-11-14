"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, MessageCircle } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";
import FadeUp from "@/components/animations/FadeUp";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Best way to reach me",
      description: "Connect professionally and send me a message",
      href: personalInfo.linkedin,
      color: "macaron-lavender",
      primary: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Check out my code",
      description: "Explore my projects and repositories",
      href: personalInfo.github,
      color: "macaron-pistachio",
      primary: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      description: "Open to remote and local opportunities",
      href: "#",
      color: "macaron-peach",
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, projects, or just connecting with fellow developers!
            </p>
          </div>
        </FadeUp>

        {/* Primary Contact Methods */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactMethods.filter(method => method.primary).map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -5 }}
                className="frosting-card-hover p-8 text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${method.color}/20 text-${method.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-chocolate mb-2 group-hover:text-macaron-pink transition-colors">
                  {method.label}
                </h3>
                <p className="text-macaron-pink font-medium mb-2">{method.value}</p>
                <p className="text-sm text-chocolate-300">{method.description}</p>
              </motion.a>
            ))}
          </div>
        </FadeUp>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What I'm Looking For */}
          <FadeUp delay={0.2}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-macaron-pink mr-3" />
                <h3 className="text-xl font-display font-bold">What I'm Looking For</h3>
              </div>
              <ul className="space-y-3 text-chocolate-400">
                <li className="flex items-start">
                  <span className="text-macaron-pink mr-2 mt-1">●</span>
                  <span>Front-end engineering opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-macaron-pink mr-2 mt-1">●</span>
                  <span>Freelance projects and collaborations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-macaron-pink mr-2 mt-1">●</span>
                  <span>Open-source contributions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-macaron-pink mr-2 mt-1">●</span>
                  <span>Networking and knowledge sharing</span>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Location */}
          <FadeUp delay={0.3}>
            <div className="frosting-card p-8">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-macaron-pistachio mr-3" />
                <h3 className="text-xl font-display font-bold">Location</h3>
              </div>
              <p className="text-chocolate-400 mb-4">
                Currently based in <span className="font-semibold text-chocolate">{personalInfo.location}</span>
              </p>
              <p className="text-chocolate-300 text-sm">
                Open to remote opportunities and local positions in the Phoenix area.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="mt-12 text-center frosting-card p-8">
            <h3 className="text-2xl font-display font-bold mb-4">
              Prefer LinkedIn?
            </h3>
            <p className="text-chocolate-300 mb-6 max-w-2xl mx-auto">
              LinkedIn is the fastest way to reach me! Send me a connection request or message, 
              and I'll get back to you as soon as possible.
            </p>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="dessert-button inline-flex items-center"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Message Me on LinkedIn
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

