import React from "react";
import Link from "next/link";
import { Eye, ShieldCheck, Cpu, BookOpen, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#070A0F] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Through Their Eyes</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              One world. Countless ways of seeing it. An evidence-led platform exploring how diverse animal species perceive light, color, spatial acuity, and motion. Built on peer-reviewed optical and neurobiological research.
            </p>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 max-w-lg">
              <span className="font-semibold text-cyan-400">Jakob von Uexküll (1909): </span>
              <span className="italic">
                &ldquo;Every animal has its own specific perceptual world (Umwelt) determined by its sensory receptors and neural architecture.&rdquo;
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-slate-200 mb-3">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/simulator" className="hover:text-cyan-300 transition-colors">
                  Vision Lab (Interactive)
                </Link>
              </li>
              <li>
                <Link href="/species" className="hover:text-cyan-300 transition-colors">
                  Species Catalogue
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-cyan-300 transition-colors">
                  Multi-Species Comparison
                </Link>
              </li>
              <li>
                <Link href="/special-vision" className="hover:text-cyan-300 transition-colors">
                  Special Vision Modules
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-cyan-300 transition-colors">
                  Perception Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Science & Integrity */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-slate-200 mb-3">
              Scientific Ethics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/science" className="hover:text-cyan-300 transition-colors">
                  Science Library & Bibliography
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-cyan-300 transition-colors">
                  Simulation Methodology
                </Link>
              </li>
              <li>
                <Link href="/about#evidence" className="hover:text-cyan-300 transition-colors">
                  Evidence Level Badges
                </Link>
              </li>
              <li>
                <Link href="/about#privacy" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Client-Side Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom banner: Non-negotiable scientific rule */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>WebGL 2.0 / GLSL Real-Time GPU Engine • Zero Server Uploads</span>
          </div>
          <p className="text-center md:text-right">
            Visual spectacle attracts; scientific integrity guides. Simulations are mathematical approximations.
          </p>
        </div>
      </div>
    </footer>
  );
}
