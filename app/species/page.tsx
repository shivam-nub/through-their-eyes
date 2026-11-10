"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SPECIES_CATALOGUE } from "@/data/species";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import { Search, Sparkles, ArrowRight, Eye, Lightbulb, Compass } from "lucide-react";

export default function SpeciesExplorerPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEvidence, setSelectedEvidence] = useState<string>("all");

  const filteredSpecies = SPECIES_CATALOGUE.filter((sp) => {
    const matchesSearch =
      sp.commonName.toLowerCase().includes(search.toLowerCase()) ||
      sp.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      sp.taxonomicFamily.toLowerCase().includes(search.toLowerCase()) ||
      sp.summary.toLowerCase().includes(search.toLowerCase()) ||
      (sp.friendlyTitle && sp.friendlyTitle.toLowerCase().includes(search.toLowerCase())) ||
      (sp.friendlyColorSummary && sp.friendlyColorSummary.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || sp.category === selectedCategory;
    const matchesEvidence = selectedEvidence === "all" || sp.evidenceLevel === selectedEvidence;

    return matchesSearch && matchesCategory && matchesEvidence;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Animal Vision Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Explore How Animals See
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From your dog&apos;s soft blue-and-yellow world to an eagle&apos;s razor-sharp telephoto vision and a bee&apos;s hidden ultraviolet flowers. Real science, translated into simple plain English.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border-white/10 mb-8 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by animal name (e.g. Dog, Cat, Bee, Eagle, Snake)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-300 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Evidence Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono text-slate-400 whitespace-nowrap">
              Evidence:
            </span>
            <select
              value={selectedEvidence}
              onChange={(e) => setSelectedEvidence(e.target.value)}
              className="bg-surface-300 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Evidence Tiers</option>
              <option value="established">Verified Science</option>
              <option value="modeled">Scientific Estimate</option>
              <option value="illustrative">Visual Concept</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["all", "mammals", "birds", "insects", "reptiles", "aquatic", "arachnids"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white bg-white/5 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecies.map((species) => (
          <div
            key={species.id}
            className="glass-panel p-6 rounded-2xl border-white/10 hover:border-cyan-500/40 hover:bg-surface-200/90 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-cyan-400 font-semibold block mb-0.5">
                    {species.category}
                  </span>
                  <Link
                    href={`/species/${species.id}`}
                    className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors"
                  >
                    {species.commonName}
                  </Link>
                  <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                    {species.friendlyTitle || species.scientificName}
                  </p>
                </div>
                <EvidenceBadge level={species.evidenceLevel} />
              </div>

              {/* In Plain English Quick Summary */}
              <div className="p-3 rounded-xl bg-surface-300 border border-white/5 mb-4 text-xs text-slate-300 leading-relaxed">
                <p className="line-clamp-3">
                  {species.inPlainEnglish || species.summary}
                </p>
              </div>

              {/* Friendly Trait Cards */}
              <div className="space-y-1.5 mb-4">
                <div className="p-2 rounded-lg bg-surface-300/80 border border-white/5 flex items-start gap-2 text-xs">
                  <span className="text-cyan-400 font-bold shrink-0">🎨 Colors:</span>
                  <span className="text-slate-300 line-clamp-1">{species.friendlyColorSummary}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-300/80 border border-white/5 flex items-start gap-2 text-xs">
                  <span className="text-cyan-400 font-bold shrink-0">👁️ Clarity:</span>
                  <span className="text-slate-300 line-clamp-1">{species.friendlySharpness}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-300/80 border border-white/5 flex items-start gap-2 text-xs">
                  <span className="text-cyan-400 font-bold shrink-0">🌙 Night:</span>
                  <span className="text-slate-300 line-clamp-1">{species.friendlyNightVision}</span>
                </div>
              </div>

              {/* Fun Fact Callout */}
              {species.funFact && (
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-start gap-2 mb-4">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    <strong>Did you know?</strong> {species.funFact}
                  </span>
                </div>
              )}

              {/* Technical quick badges for science nerds */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-2">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                  Acuity: {species.acuity.cyclesPerDegree} cpd ({species.acuity.snellenEquivalent})
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                  FOV: {species.fieldOfView.totalHorizontalDegrees}°
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                href={`/species/${species.id}`}
                className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/simulator?species=${species.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simulate
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-base">No animals found matching your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedEvidence("all");
            }}
            className="mt-3 text-xs font-mono uppercase tracking-wider text-cyan-400 underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
