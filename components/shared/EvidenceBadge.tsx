"use client";

import React, { useState } from "react";
import { EvidenceLevel } from "@/types/species";
import { EVIDENCE_LEVEL_DEFINITIONS } from "@/data/species";
import { Info, ShieldAlert, CheckCircle2, Sparkles } from "lucide-react";

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  showTooltip?: boolean;
  className?: string;
}

export function EvidenceBadge({ level, showTooltip = true, className = "" }: EvidenceBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const def = EVIDENCE_LEVEL_DEFINITIONS[level];

  const getIcon = () => {
    switch (level) {
      case "established":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "modeled":
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
      case "illustrative":
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono tracking-wide border uppercase font-medium transition-all ${def.badgeColor}`}
      >
        {getIcon()}
        <span>{def.label}</span>
        {showTooltip && <Info className="w-3 h-3 opacity-60 hover:opacity-100 ml-0.5" />}
      </button>

      {showTooltip && isOpen && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 rounded-lg glass-panel-glow shadow-2xl text-xs text-slate-200 pointer-events-none transition-all">
          <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-100">
            {getIcon()}
            <span className="uppercase tracking-wider">{def.label} Evidence</span>
          </div>
          <p className="text-slate-300 leading-relaxed mb-2">{def.description}</p>
          <div className="pt-1.5 border-t border-white/10 text-[11px] text-slate-400 italic">
            {def.tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
