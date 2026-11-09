import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Eye,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Award,
  Sun,
  Moon,
  Flame,
  Radio,
  BookOpen,
} from "lucide-react";
import { VisionSimulator } from "@/components/simulator/VisionSimulator";
import { SPECIES_CATALOGUE } from "@/data/species";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";

export default function HomePage() {
  const featuredSpecies = SPECIES_CATALOGUE.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 flex flex-col items-center text-center">
        {/* Glowing radial backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none -z-10" />

        {/* Science Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Peer-Reviewed Optical & Neurobiological Models</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          The world is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
            not what you think
          </span>{" "}
          it is.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
          Step beyond human perception. Explore how dogs, raptors, bees, and marine predators experience light, ultraviolet patterns, detail, and motion in real time.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wider font-semibold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:shadow-[0_0_40px_rgba(0,245,255,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            Enter The Vision Lab
          </Link>
          <Link
            href="/species"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wider font-medium text-slate-200 glass-panel hover:bg-white/10 hover:text-white border-white/15 transition-all"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Explore 13 Species
          </Link>
        </div>
      </section>

      {/* Featured Interactive Demonstration Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2">
            Live Perception Simulation
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Human Vision vs. The Animal Kingdom
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-2">
            Drag the comparison slider or switch species below to see real-time GPU shader approximations driven by documented photoreceptor opsins and visual acuity metrics.
          </p>
        </div>

        {/* Embedded Vision Simulator */}
        <VisionSimulator initialSpeciesId="dog" initialSceneId="alpine-flowers" />
      </section>

      {/* Species Discovery Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              Curated Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Discover How Other Species See
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-lg">
              Every profile documents photoreceptor classes, cycles per degree, low-light thresholds, and peer-reviewed sources.
            </p>
          </div>
          <Link
            href="/species"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>View All 13 Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpecies.map((species) => (
            <Link
              key={species.id}
              href={`/species/${species.id}`}
              className="glass-panel p-5 rounded-2xl border-white/10 hover:border-cyan-500/40 hover:bg-surface-200/90 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                      {species.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {species.commonName}
                    </h3>
                    <p className="text-xs text-slate-400 italic">{species.scientificName}</p>
                  </div>
                  <EvidenceBadge level={species.evidenceLevel} showTooltip={false} />
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {species.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2 rounded bg-surface-300 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">Acuity</span>
                    <span className="font-semibold text-cyan-300">{species.acuity.cyclesPerDegree} cpd</span>
                  </div>
                  <div className="p-2 rounded bg-surface-300 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">Receptors</span>
                    <span className="font-semibold text-cyan-300">{species.photoreceptors.count} Classes</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>Inspect Dossier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Sensory Systems Teaser */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-violet-400 font-semibold mb-2 block">
            Beyond Ordinary Eyesight
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Unusual Visual & Sensory Capabilities
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Explore wavelengths, polarization, and thermal modalities outside normal human experience, clearly separated between ocular vision and non-visual senses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/special-vision#ultraviolet"
            className="glass-panel p-5 rounded-xl border-white/10 hover:border-violet-500/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center mb-4 text-violet-300 group-hover:scale-110 transition-transform">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Ultraviolet Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              How bees and birds see floral nectar guides and urine trails invisible to human eyes.
            </p>
          </Link>

          <Link
            href="/special-vision#lowlight"
            className="glass-panel p-5 rounded-xl border-white/10 hover:border-cyan-500/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 text-cyan-300 group-hover:scale-110 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Tapetum Lucidum</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retroreflective retinal layers that double scotopic photon capture for cats and nocturnal predators.
            </p>
          </Link>

          <Link
            href="/special-vision#thermal"
            className="glass-panel p-5 rounded-xl border-white/10 hover:border-amber-500/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-300 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Thermal Infrared Organs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Loreal pit organ thermoreception in rattlesnakes — somatosensory heat detection, not retinal eyesight.
            </p>
          </Link>

          <Link
            href="/special-vision#polarization"
            className="glass-panel p-5 rounded-xl border-white/10 hover:border-sky-500/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mb-4 text-sky-300 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Polarized Light</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Celestial e-vector navigation in insects and cephalopod contrast tracking underwater.
            </p>
          </Link>
        </div>
      </section>

      {/* Scientific Credibility & Ethics Statement */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="glass-panel-glow p-8 rounded-3xl border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Evidence-First Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Simulations are mathematical models, not literal subjective experience.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thomas Nagel famously asked, <em>&ldquo;What is it like to be a bat?&rdquo;</em> We cannot recreate an animal&apos;s subjective consciousness. What we can do with scientific rigor is simulate optical ray refraction, photoreceptor spectral absorption, spatial frequency resolution, and low-light thresholds. Every visual effect on this platform carries an explicit evidence rating and discloses hardware limitations.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/science"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <BookOpen className="w-4 h-4" />
                  Read The Science Library
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white font-medium"
                >
                  Methodology & Limitations
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-300 border border-white/10 space-y-3">
              <h4 className="text-xs uppercase font-mono text-cyan-400 font-semibold">
                Our Three Evidence Tiers:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-white/5 border-l-2 border-emerald-400">
                  <span className="font-bold text-emerald-400 block">Established:</span>
                  <span className="text-slate-300">
                    Direct ERG/optomotor measurement of opsins and cycles per degree.
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white/5 border-l-2 border-cyan-400">
                  <span className="font-bold text-cyan-400 block">Modeled:</span>
                  <span className="text-slate-300">
                    Calculated mathematical approximations with documented simplifications.
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white/5 border-l-2 border-amber-400">
                  <span className="font-bold text-amber-400 block">Illustrative:</span>
                  <span className="text-slate-300">
                    Conceptual educational visualizations for non-RGB or thermal channels.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
