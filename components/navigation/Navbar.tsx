"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Menu, X, Sparkles, Compass, Shield, BookOpen, Layers, Award } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Eye },
  { href: "/simulator", label: "Vision Lab", icon: Sparkles, highlight: true },
  { href: "/species", label: "Species", icon: Compass },
  { href: "/compare", label: "Compare", icon: Layers },
  { href: "/special-vision", label: "Special Vision", icon: Shield },
  { href: "/challenges", label: "Challenges", icon: Award },
  { href: "/science", label: "Science", icon: BookOpen },
  { href: "/about", label: "About", icon: Eye },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
            <Eye className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm -z-10 group-hover:bg-cyan-400/20 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Through Their Eyes
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/70">
              Perception Simulator
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-cyan-300 bg-white/5 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,245,255,0.15)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                } ${link.highlight && !isActive ? "text-cyan-400 font-semibold" : ""}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "opacity-60"}`} />
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Launch Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/simulator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Enter Vision Lab
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-6 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "opacity-60"}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Enter Vision Lab
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
