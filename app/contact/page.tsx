"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";
import FadeUp from "@/components/animations/FadeUp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to an API
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Don't expose email directly - encourage use of contact form
  const contactMethods = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Best way to reach me",
      href: personalInfo.linkedin,
      color: "macaron-lavender",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Check out my code",
      href: personalInfo.github,
      color: "macaron-pistachio",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "#",
      color: "macaron-peach",
    },
    {
      icon: Mail,
      label: "Contact Form",
      value: "Use the form to reach out",
      href: "#contact-form",
      color: "macaron-pink",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-chocolate-300 max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? I'd love to hear from you!
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="frosting-card p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Let's Connect</h2>
                <p className="text-chocolate-300 mb-6">
                  I'm always excited to collaborate on interesting projects or discuss new opportunities. 
                  Feel free to reach out through any of these channels:
                </p>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center p-4 rounded-lg bg-latte-100 hover:bg-latte-200 transition-colors group"
                    >
                      <div className={`p-3 rounded-lg bg-${method.color}/20 text-${method.color} mr-4 group-hover:scale-110 transition-transform`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-chocolate">{method.label}</p>
                        <p className="text-sm text-chocolate-300">{method.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="frosting-card p-8">
                <h3 className="text-xl font-display font-bold mb-4">What I'm Looking For</h3>
                <ul className="space-y-3 text-chocolate-400">
                  <li className="flex items-start">
                    <span className="text-macaron-pink mr-2 mt-1">●</span>
                    <span>Full-time opportunities in web development</span>
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
            </div>
          </FadeUp>

          {/* Contact Form */}
          <FadeUp delay={0.2}>
            <div className="frosting-card p-8" id="contact-form">
              <h2 className="text-2xl font-display font-bold mb-6">Send Me a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-macaron-pistachio mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-chocolate mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-chocolate-300">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-chocolate mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-chocolate-200 bg-latte-50 focus:outline-none focus:ring-2 focus:ring-macaron-pink focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-chocolate mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-chocolate-200 bg-latte-50 focus:outline-none focus:ring-2 focus:ring-macaron-pink focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-chocolate mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-chocolate-200 bg-latte-50 focus:outline-none focus:ring-2 focus:ring-macaron-pink focus:border-transparent transition-all"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-chocolate mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-chocolate-200 bg-latte-50 focus:outline-none focus:ring-2 focus:ring-macaron-pink focus:border-transparent transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dessert-button flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

