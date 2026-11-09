import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SPECIES_CATALOGUE } from "@/data/species";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import {
  Sparkles,
  ArrowLeft,
  BookOpen,
  Info,
  ShieldAlert,
  Eye,
  Zap,
  Moon,
  Compass,
  Layers,
  ChevronRight,
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/species"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Species Catalogue
        </Link>
      </div>

      {/* Hero Dossier Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 mb-8 relative overflow-hidden">
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
            <p className="text-base text-cyan-300/80 italic font-serif">{species.scientificName}</p>
            <p className="text-xs text-slate-400 max-w-xl pt-1">
              <span className="font-mono text-slate-300">Ecological Role:</span> {species.ecologicalNiche}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/simulator?species=${species.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Launch in Vision Lab
            </Link>
          </div>
        </div>

        {/* Featured Quote */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-cyan-200 italic font-serif">
          &ldquo;{species.featuredQuote}&rdquo;
        </div>
      </div>

      {/* Main Grid: Biological Systems Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Photoreceptor Spectra */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Photoreceptors & Spectral Tuning</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {species.photoreceptors.type}. Photoreceptor opsins absorb specific wavelength bands to generate electrical potentials.
          </p>

          <div className="space-y-2 pt-2">
            {species.photoreceptors.classes.map((cls, idx) => {
              // Calculate rough percentage along 300nm-700nm visual spectrum
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
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Visual Acuity & Detail Resolution</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Spatial resolution is quantified in <strong>Cycles Per Degree (cpd)</strong>: the highest frequency of alternating light and dark bars an animal can resolve within 1° of visual angle.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Acuity Threshold</span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {species.acuity.cyclesPerDegree}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">cycles/degree</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Snellen Equivalent</span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {species.acuity.snellenEquivalent}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Human standard: 20/20</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-300/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
            {species.acuity.description}
          </div>
        </div>

        {/* Low-Light & Tapetum Lucidum */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Low-Light Sensitivity (Scotopic)</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Tapetum Lucidum</span>
              <span className={`text-base font-bold font-mono ${species.lowLight.tapetumLucidum ? "text-emerald-400" : "text-slate-400"}`}>
                {species.lowLight.tapetumLucidum ? "Present (Reflective)" : "Absent"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5 flex-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Sensitivity Factor</span>
              <span className="text-base font-bold font-mono text-cyan-300">
                {species.lowLight.sensitivityMultiplier}x Human
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {species.lowLight.description}
          </p>
        </div>

        {/* Field of View & Motion */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Field of View & Flicker Fusion</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Panoramic FOV</span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {species.fieldOfView.totalHorizontalDegrees}°
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Binocular: {species.fieldOfView.binocularDegrees}°</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-300 border border-white/5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Critical Flicker (CFF)</span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {species.temporalResolution.cffHz} Hz
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Human: ~60 Hz</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {species.temporalResolution.relativeSpeedDescription}
          </p>
        </div>
      </div>

      {/* Assumptions, Limitations, & Sources */}
      <div className="space-y-6">
        {/* Evolutionary Adaptations */}
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
          <h3 className="text-sm uppercase font-mono tracking-wider font-semibold text-cyan-400">
            Key Evolutionary Adaptations
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
            <span>Documented Model Assumptions & Hardware Limitations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-200 block mb-1">Mathematical Assumptions:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                {species.scientificAssumptions.map((assump, idx) => (
                  <li key={idx}>{assump}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-slate-200 block mb-1">Screen / Hardware Limitations:</span>
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
            <span>Peer-Reviewed Citations & Literature</span>
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
