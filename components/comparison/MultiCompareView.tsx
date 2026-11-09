"use client";

import React, { useState, useRef, useEffect } from "react";
import { SPECIES_CATALOGUE } from "@/data/species";
import { SAMPLE_SCENES } from "@/data/sample-scenes";
import { VisionRenderer } from "@/engine/renderer/VisionRenderer";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import { Layers, Plus, Trash2, Sliders, Split, Grid, Sparkles, Info } from "lucide-react";

export function MultiCompareView() {
  const [selectedSceneId, setSelectedSceneId] = useState<string>("alpine-flowers");
  const [selectedSpeciesIds, setSelectedSpeciesIds] = useState<string[]>([
    "dog",
    "golden-eagle",
    "honeybee",
    "cat",
  ]);
  const [compareMode, setCompareMode] = useState<"grid" | "slider">("grid");
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const renderersRef = useRef<(VisionRenderer | null)[]>([]);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  const currentScene = SAMPLE_SCENES.find((s) => s.id === selectedSceneId) || SAMPLE_SCENES[0];

  // Initialize and update renderers
  useEffect(() => {
    renderersRef.current.forEach((r) => r?.dispose());
    renderersRef.current = canvasRefs.current.map((canvas) =>
      canvas ? new VisionRenderer(canvas) : null
    );

    return () => {
      renderersRef.current.forEach((r) => r?.dispose());
    };
  }, [selectedSpeciesIds.length, compareMode]);

  // Render on image load or species changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImageRef.current = img;
      renderAll();
    };
    img.src = currentScene.imageUrl;
  }, [selectedSceneId]);

  const renderAll = () => {
    if (!loadedImageRef.current) return;
    const img = loadedImageRef.current;

    selectedSpeciesIds.forEach((spId, idx) => {
      const renderer = renderersRef.current[idx];
      const species = SPECIES_CATALOGUE.find((s) => s.id === spId);
      if (renderer && species) {
        renderer.render(img, species.shaderParams);
      }
    });
  };

  useEffect(() => {
    if (loadedImageRef.current) {
      renderAll();
    }
  }, [selectedSpeciesIds, compareMode]);

  const addSpecies = (id: string) => {
    if (selectedSpeciesIds.length < 4 && !selectedSpeciesIds.includes(id)) {
      setSelectedSpeciesIds([...selectedSpeciesIds, id]);
    }
  };

  const removeSpecies = (id: string) => {
    if (selectedSpeciesIds.length > 2) {
      setSelectedSpeciesIds(selectedSpeciesIds.filter((spId) => spId !== id));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Controls */}
      <div className="glass-panel p-4 rounded-2xl border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Scene Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
            Test Scene:
          </span>
          <select
            value={selectedSceneId}
            onChange={(e) => setSelectedSceneId(e.target.value)}
            className="bg-surface-300 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            {SAMPLE_SCENES.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.title}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
            Layout:
          </span>
          <div className="inline-flex rounded-lg bg-surface-300 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setCompareMode("grid")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                compareMode === "grid"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Multi-Grid (2-4 Panels)
            </button>
            <button
              type="button"
              onClick={() => setCompareMode("slider")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                compareMode === "slider"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Slider Comparison
            </button>
          </div>
        </div>

        {/* Add Species Selector */}
        {selectedSpeciesIds.length < 4 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addSpecies(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="bg-surface-300 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-cyan-400 focus:outline-none focus:border-cyan-400"
            >
              <option value="" disabled>
                + Add Species to Compare
              </option>
              {SPECIES_CATALOGUE.filter((s) => !selectedSpeciesIds.includes(s.id)).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.commonName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Grid Comparison Mode */}
      {compareMode === "grid" && (
        <div
          className={`grid gap-6 ${
            selectedSpeciesIds.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : selectedSpeciesIds.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          }`}
        >
          {selectedSpeciesIds.map((spId, idx) => {
            const species = SPECIES_CATALOGUE.find((s) => s.id === spId) || SPECIES_CATALOGUE[0];
            return (
              <div
                key={spId}
                className="glass-panel p-4 rounded-2xl border-white/10 flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{species.commonName}</h3>
                    <p className="text-[11px] text-slate-400 italic">{species.scientificName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <EvidenceBadge level={species.evidenceLevel} />
                    {selectedSpeciesIds.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeSpecies(spId)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Remove panel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Canvas Viewport */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[idx] = el;
                    }}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                    {species.photoreceptors.count} Opsins • {species.acuity.cyclesPerDegree} cpd
                  </div>
                </div>

                {/* Biological Traits Comparison Bar */}
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded bg-surface-300 border border-white/5">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">Acuity</span>
                    <span className="font-semibold text-cyan-300">{species.acuity.snellenEquivalent}</span>
                  </div>
                  <div className="p-2 rounded bg-surface-300 border border-white/5">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">Night Vision</span>
                    <span className="font-semibold text-cyan-300">{species.lowLight.sensitivityMultiplier}x</span>
                  </div>
                  <div className="p-2 rounded bg-surface-300 border border-white/5">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">FOV</span>
                    <span className="font-semibold text-cyan-300">{species.fieldOfView.totalHorizontalDegrees}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slider Comparison Mode (Choose two active species) */}
      {compareMode === "slider" && (
        <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Compare Any Two Species via Interactive Split
            </span>
            <div className="flex items-center gap-3">
              <select
                value={selectedSpeciesIds[0]}
                onChange={(e) => {
                  const newIds = [...selectedSpeciesIds];
                  newIds[0] = e.target.value;
                  setSelectedSpeciesIds(newIds);
                }}
                className="bg-surface-300 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {SPECIES_CATALOGUE.map((s) => (
                  <option key={s.id} value={s.id}>
                    Left: {s.commonName}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-500">vs</span>
              <select
                value={selectedSpeciesIds[1] || selectedSpeciesIds[0]}
                onChange={(e) => {
                  const newIds = [...selectedSpeciesIds];
                  newIds[1] = e.target.value;
                  setSelectedSpeciesIds(newIds);
                }}
                className="bg-surface-300 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {SPECIES_CATALOGUE.map((s) => (
                  <option key={s.id} value={s.id}>
                    Right: {s.commonName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Split Viewport */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/15 shadow-2xl">
            <canvas
              ref={(el) => {
                canvasRefs.current[1] = el;
              }}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <canvas
                ref={(el) => {
                  canvasRefs.current[0] = el;
                }}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ width: "100%", maxWidth: "none" }}
              />
            </div>

            {/* Slider Divider */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
              style={{ left: `calc(${sliderPosition}% - 16px)`, width: "32px" }}
              onMouseDown={(e) => {
                const moveHandler = (moveEvent: MouseEvent) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (!rect) return;
                  const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                };
                const upHandler = () => {
                  window.removeEventListener("mousemove", moveHandler);
                  window.removeEventListener("mouseup", upHandler);
                };
                window.addEventListener("mousemove", moveHandler);
                window.addEventListener("mouseup", upHandler);
              }}
            >
              <div className="w-[2px] h-full bg-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.8)]" />
              <div className="w-7 h-7 rounded-full bg-surface-100 border border-cyan-400 flex items-center justify-center shadow-lg">
                <Sliders className="w-3.5 h-3.5 text-cyan-300 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Educational Guideline on Comparison */}
      <div className="p-4 rounded-xl bg-surface-300/60 border border-white/10 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Evolutionary Trade-Off Principle:</strong> Animals do not possess &ldquo;better&rdquo; or &ldquo;worse&rdquo; vision in absolute terms. Raptors sacrifice night vision for 140 cpd telephoto resolution; owls sacrifice high-speed daylight color opsins for photon-counting rod optics; prey ungulates trade stereoscopic depth for 350° peripheral survival monitoring.
        </p>
      </div>
    </div>
  );
}
