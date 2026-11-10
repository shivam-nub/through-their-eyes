import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SPECIES_CATALOGUE } from "@/data/species";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import {
  Sparkles,
  ArrowLeft,
  BookOpen,
  ShieldAlert,
  Eye,
  Zap,
  Moon,
  Compass,
  Lightbulb,
  HeartHandshake,
  Glasses,
  Palette,
  Timer,
} from "lucide-react";

interface SpeciesDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SPECIES_CATALOGUE.map((species) => ({
    id: species.id,
  }));
}

export default async function SpeciesDetailPage({ params }: SpeciesDetailPageProps) {
  const { id } = await params;
  const species = SPECIES_CATALOGUE.find((s) => s.id === id);

  if (!species) {
    notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/species"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Animal Catalogue
        </Link>
      </div>

      {/* Hero Dossier Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                {species.category} • {species.taxonomicFamily}
              </span>
              <EvidenceBadge level={species.evidenceLevel} />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {species.commonName}
            </h1>
            <p className="text-lg text-amber-300 font-medium">
              {species.friendlyTitle || species.scientificName}
            </p>
            <p className="text-xs text-slate-400 max-w-xl">
              <span className="font-mono text-slate-300">Scientific Name:</span> <span className="italic">{species.scientificName}</span> • <span className="font-mono text-slate-300">Niche:</span> {species.ecologicalNiche}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/simulator?species=${species.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Launch Vision Lab
            </Link>
          </div>
        </div>

        {/* Featured Quote */}
        {species.featuredQuote && (
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-cyan-200 italic font-serif">
            &ldquo;{species.featuredQuote}&rdquo;
          </div>
        )}
      </div>

      {/* Section 1: In Plain English Story & Mind-Blowing Fact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border-cyan-500/30 bg-cyan-950/20 space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm uppercase font-mono tracking-wider">
            <HeartHandshake className="w-4 h-4 text-cyan-400" />
            <span>In Plain English: How They See</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {species.inPlainEnglish || species.summary}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-amber-500/30 bg-amber-950/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase font-mono tracking-wider">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span>Mind-Blowing Fact</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
            {species.funFact || "Every sensory organ in this animal is tailored by millions of years of evolution to match its hunting or foraging environment."}
          </p>
        </div>
      </div>

      {/* Section 2: Friendly 5-Point Sensory Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Glasses className="w-5 h-5 text-cyan-400" />
          <span>Everyday Sensory Breakdown</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Colors */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Palette className="w-4 h-4" />
              <span>Color Vision</span>
            </div>
            <p className="text-sm font-semibold text-white">{species.friendlyColorSummary}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipped with {species.photoreceptors.count} cone receptor types ({species.photoreceptors.type.toLowerCase()}).
            </p>
          </div>

          {/* Sharpness */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Eye className="w-4 h-4" />
              <span>Image Sharpness</span>
            </div>
            <p className="text-sm font-semibold text-white">{species.friendlySharpness}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Snellen rating: <strong className="text-cyan-300">{species.acuity.snellenEquivalent}</strong> (Human standard is 20/20).
            </p>
          </div>

          {/* Night Vision */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Moon className="w-4 h-4" />
              <span>Night Vision</span>
            </div>
            <p className="text-sm font-semibold text-white">{species.friendlyNightVision}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {species.lowLight.sensitivityMultiplier}x human sensitivity • Tapetum mirror: {species.lowLight.tapetumLucidum ? "Yes" : "No"}.
            </p>
          </div>

          {/* Motion & Speed */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Timer className="w-4 h-4" />
              <span>Motion & Speed</span>
            </div>
            <p className="text-sm font-semibold text-white">{species.friendlyMotion}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sees up to <strong className="text-cyan-300">{species.temporalResolution.cffHz} frames/sec</strong> before motion blurs together (Humans see ~60 Hz).
            </p>
          </div>

          {/* Field of View */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>Field of View</span>
            </div>
            <p className="text-sm font-semibold text-white">{species.friendlyFOV}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total panoramic coverage: <strong className="text-cyan-300">{species.fieldOfView.totalHorizontalDegrees}°</strong> • 3D depth-perception overlap: <strong className="text-cyan-300">{species.fieldOfView.binocularDegrees}°</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Deep Laboratory Anatomy & Physics */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Deep Dive: Laboratory Measurements & Anatomy</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Exact Scientific Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photoreceptor Spectra */}
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Photoreceptor Peak Sensitivity (Wavelengths)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Each photoreceptor opsin protein absorbs light at specific wavelengths (measured in nanometers, nm). Here is this species&apos; peak absorption spectrum:
            </p>

            <div className="space-y-2 pt-2">
              {species.photoreceptors.classes.map((cls, idx) => {
                const pct = Math.min(100, Math.max(0, ((cls.peakNm - 300) / 420) * 100));
                return (
                  <div key={idx} className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{cls.name}</span>
                      <span className="font-mono text-cyan-300 font-bold">{cls.peakNm} nm</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                      <div
                        className="absolute top-0 bottom-0 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)] -translate-x-1/2"
                        style={{ left: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{cls.colorBand}</span>
                      <span>{cls.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Acuity & Spatial Frequency */}
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Acuity & Spatial Frequency</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Measured in <strong>Cycles Per Degree (cpd)</strong>: how many pairs of black-and-white lines the eye can resolve in 1 degree of vision before blurring into flat gray.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Acuity Cutoff</span>
                <span className="text-2xl font-bold font-mono text-cyan-300">
                  {species.acuity.cyclesPerDegree}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">cycles/degree (Human: 30)</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Snellen Equivalent</span>
                <span className="text-2xl font-bold font-mono text-cyan-300">
                  {species.acuity.snellenEquivalent}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Human baseline: 20/20</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-300/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
              {species.acuity.description}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Adaptations, Assumptions & Citations */}
      <div className="space-y-6 pt-2">
        {/* Evolutionary Adaptations */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
          <h3 className="text-sm uppercase font-mono tracking-wider font-semibold text-cyan-400">
            Key Evolutionary Superpowers
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-200">
            {species.specialAdaptations.map((adapt, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-surface-300 border border-white/5 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{adapt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Model Limitations & Scientific Caveats */}
        <div className="glass-panel p-6 rounded-2xl border-amber-500/20 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Honest Scientific Caveats & Simulation Limits</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-200 block mb-1">Scientific Assumptions:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                {species.scientificAssumptions.map((assump, idx) => (
                  <li key={idx}>{assump}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-slate-200 block mb-1">Screen / Monitor Limits:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                {species.scientificLimitations.map((lim, idx) => (
                  <li key={idx}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scientific Sources & Citations */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
          <h3 className="text-sm uppercase font-mono tracking-wider font-semibold text-slate-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Peer-Reviewed Academic Sources</span>
          </h3>
          <div className="space-y-2 text-xs">
            {species.sources.map((src, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-300 border border-white/5 text-slate-300">
                <span className="font-semibold text-white">{src.authors} ({src.year}).</span> &ldquo;{src.title}&rdquo;{" "}
                {src.journal && <span className="italic text-cyan-300">{src.journal}.</span>}{" "}
                {src.doiOrUrl && (
                  <a
                    href={src.doiOrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1 ml-1"
                  >
                    DOI Reference
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
