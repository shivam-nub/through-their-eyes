import React from "react";
import { InteractiveChallenges } from "@/components/challenges/InteractiveChallenge";
import { Award } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Hands-On Perception Experiments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Vision Challenges
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Test your understanding of animal optical physics and sensory ecology through four scenario-based experiments.
        </p>
      </div>

      <InteractiveChallenges />
    </div>
  );
}
