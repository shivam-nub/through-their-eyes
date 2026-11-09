import React from "react";
import { MultiCompareView } from "@/components/comparison/MultiCompareView";
import { Layers } from "lucide-react";

export default function ComparePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Synchronized Multi-Species Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Compare Vision Systems
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Inspect the exact same scene through two to four species simultaneously. Compare how disparate evolutionary pressures sculpt photoreceptors, spatial acuity, and contrast.
        </p>
      </div>

      <MultiCompareView />
    </div>
  );
}
