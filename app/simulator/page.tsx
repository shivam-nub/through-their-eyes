"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VisionSimulator } from "@/components/simulator/VisionSimulator";
import { Sparkles, ShieldCheck, Info } from "lucide-react";

function VisionLabContent() {
  const searchParams = useSearchParams();
  const initialSpecies = searchParams.get("species") || "dog";
  const initialScene = searchParams.get("scene") || "alpine-flowers";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Perception Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Vision Lab
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mt-1">
            Upload custom photographs, stream from your live camera, or inspect curated environments. Compare real-time visual approximations against human reference vision.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client-Side WebGL</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border-white/10">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>No Image Uploaded to Server</span>
          </div>
        </div>
      </div>

      {/* Reusable Simulator Stage */}
      <VisionSimulator initialSpeciesId={initialSpecies} initialSceneId={initialScene} />
    </div>
  );
}

export default function VisionLabPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Vision Lab...</div>}>
      <VisionLabContent />
    </Suspense>
  );
}
