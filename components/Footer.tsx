"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

// Don't expose email directly in footer - users can use the contact form
const socialLinks = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
].filter(link => link.href);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-chocolate-700 text-latte-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              <span className="text-macaron-pink">{personalInfo.name}</span>
            </h3>
            <p className="text-latte-300 text-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-macaron-lavender">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/experience" className="text-latte-300 hover:text-macaron-pink transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-latte-300 hover:text-macaron-pink transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-latte-300 hover:text-macaron-pink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-latte-300 hover:text-macaron-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-macaron-lavender">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-latte-100/10 hover:bg-macaron-pink/20 text-latte-100 hover:text-macaron-pink transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-latte-100/10 flex flex-col sm:flex-row justify-between items-center text-sm text-latte-300">
          <p>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center mt-4 sm:mt-0">
            Made with <Heart size={16} className="mx-1 text-macaron-pink fill-current" /> and lots of desserts
          </p>
        </div>
      </div>
    </footer>
  );
}

