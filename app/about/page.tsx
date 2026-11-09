import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Eye,
  Lock,
  Sparkles,
  BookOpen,
  Cpu,
  Heart,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";

export default function AboutMethodologyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Scientific Ethics & Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          About & Methodology
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The principles, philosophy, and privacy guardrails governing the Through Their Eyes platform.
        </p>
      </div>

      {/* Philosophy: The Concept of Umwelt */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Theoretical Foundation
            </span>
            <h2 className="text-2xl font-bold text-white">The Umwelt Principle</h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            In 1909, Baltic-German biologist <strong>Jakob von Uexküll</strong> coined the concept of the <em>Umwelt</em> (literally &ldquo;environment&rdquo; or &ldquo;surrounding world&rdquo;). He demonstrated that no two animal species inhabit the same objective physical reality. Instead, an organism&apos;s reality is carved out by what its specific sense organs can detect and what its nervous system finds biologically meaningful.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-cyan-200 text-xs">
            &ldquo;Every animal is surrounded with a certain number of things which act as stimuli and form its own world. The physical reality of a meadow to an eagle scanning for prey at 1,000 feet, to a honeybee hunting ultraviolet nectar rings, and to a tick waiting on a blade of grass for butyric acid from warm blood, are three fundamentally distinct universes.&rdquo;
          </div>
        </div>
      </div>

      {/* Evidence Tier Taxonomy */}
      <div id="evidence" className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-6">
        <div>
          <span className="text-xs uppercase font-mono text-cyan-400 font-semibold block mb-1">
            Standardized Transparency
          </span>
          <h2 className="text-2xl font-bold text-white">The Three Evidence Tiers</h2>
          <p className="text-xs text-slate-400 mt-1">
            To prevent overstating scientific certainty, every simulation and feature on this site carries one of three explicit labels:
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-surface-300 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <EvidenceBadge level="established" />
              <span className="text-xs font-mono text-emerald-400 font-semibold">Tier 1: Empirical</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct physiological measurements exist for photoreceptor absorption curves (&lambda; max), retinal ganglion cell density, optical lens refractive power, and behavioral optomotor acuity (e.g. canine dichromacy, avian foveal packing).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-300 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <EvidenceBadge level="modeled" />
              <span className="text-xs font-mono text-cyan-400 font-semibold">Tier 2: Approximation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mathematical simulations derived from known biological parameters, acknowledging standard RGB display limitations (e.g. cephalopod chromatic aberration focus, mantis shrimp serial hyperspectral scanning).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-300 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <EvidenceBadge level="illustrative" />
              <span className="text-xs font-mono text-amber-400 font-semibold">Tier 3: Conceptual</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Educational visual representations for non-RGB or non-ocular modalities (e.g. rattlesnake facial thermal infrared pit organs). Explicitly highlights that ordinary webcams do not record thermal infrared wavelengths.
            </p>
          </div>
        </div>
      </div>

      {/* Methodology & Technical Architecture */}
      <div id="methodology" className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Pipeline Architecture
            </span>
            <h2 className="text-2xl font-bold text-white">Simulation Engine Pipeline</h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            Rather than applying arbitrary Instagram-style filters, our WebGL GLSL shader pipeline executes sequential biological processing stages:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-300 font-mono">
            <li>
              <strong className="text-white">Source Input Normalization:</strong> Color space handling and pixel dimension fitting from images or media streams.
            </li>
            <li>
              <strong className="text-white">Spectral LMS Projection:</strong> 3x3 opsin transformation matrix collapsing or separating chromatic axes according to species electrophysiology.
            </li>
            <li>
              <strong className="text-white">Spatial Frequency Convolution:</strong> Gaussian blur kernel calibrated directly to the species&apos; Cycles Per Degree relative to human 60 cpd.
            </li>
            <li>
              <strong className="text-white">Compound Eye Ommatidial Discretization:</strong> Quantizes coordinates into hexagonal facet micro-samples for bees and flies.
            </li>
            <li>
              <strong className="text-white">Scotopic Purkinje Shift:</strong> Blue-cyan luminance boost under low-light configurations simulating rod-dominated retinas.
            </li>
          </ol>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div id="privacy" className="glass-panel p-6 sm:p-8 rounded-3xl border-emerald-500/30 bg-emerald-500/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-emerald-400 font-semibold">
              Privacy By Design
            </span>
            <h2 className="text-2xl font-bold text-white">100% Client-Side Processing</h2>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <p>
            Your photos and camera feeds are private and personal. Through Their Eyes processes <strong>all image manipulation and live camera streams strictly within your browser&apos;s WebGL hardware buffer</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
            <li>No user photos are ever transmitted to or stored on any server.</li>
            <li>No camera video or audio is ever recorded, buffered remotely, or analyzed.</li>
            <li>All camera tracks are immediately terminated and released as soon as you stop the stream or navigate away.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
