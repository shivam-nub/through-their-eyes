"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  Sun,
  Moon,
  Compass,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface ChallengeQuestion {
  id: string;
  title: string;
  scenarioDescription: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  hint: string;
  learningOutcome: string;
  speciesComparison: string;
}

const CHALLENGES_DATA: ChallengeQuestion[] = [
  {
    id: "camouflage",
    title: "Challenge 1: The Blaze Orange Enigma",
    scenarioDescription: "A hunter in a dense autumn forest is wearing a fluorescent blaze orange jacket against lush green and amber leaves.",
    question: "Why do deer frequently walk directly past hunters wearing fluorescent orange without becoming alarmed?",
    options: [
      {
        id: "a",
        text: "Deer have dichromatic vision lacking red cones; to them, blaze orange looks like dull brownish-yellow blending into green leaves.",
        isCorrect: true,
        explanation: "Correct! White-tailed deer are dichromats with peak opsins at 430 nm (blue) and 537 nm (green). They cannot distinguish red or orange from green foliage.",
      },
      {
        id: "b",
        text: "Deer are completely colorblind and see only pure black and white shades.",
        isCorrect: false,
        explanation: "Incorrect. Deer possess two cone types (dichromacy) and see blues and yellows very well, but lack the L-cone needed for red-green discrimination.",
      },
      {
        id: "c",
        text: "Deer have 140 cycles per degree acuity and can tell the hunter is not a predator.",
        isCorrect: false,
        explanation: "Incorrect. Deer acuity is around 8.5 cpd (20/100 Snellen), significantly lower than human vision; they rely on motion rather than fine detail.",
      },
    ],
    hint: "Think about the number of cone photoreceptors ungulates possess compared to human trichromats.",
    learningOutcome: "Human trichromatic color vision evolved to spot ripe reddish fruit among green forest leaves. Most non-primate mammals are dichromats.",
    speciesComparison: "Human (Trichromat 20/20) vs. White-Tailed Deer (Dichromat 20/100)",
  },
  {
    id: "uv-nectar",
    title: "Challenge 2: The Floral Ultraviolet Secret",
    scenarioDescription: "A botanist photographs a field of yellow dandelions with an ordinary smartphone camera, then inspects them with a UV camera.",
    question: "What does a honeybee perceive on flower petals that a human completely misses?",
    options: [
      {
        id: "a",
        text: "The flower emits infrared warmth that glows red in the bee's compound eyes.",
        isCorrect: false,
        explanation: "Incorrect. Bees do not detect thermal infrared; their spectral sensitivity is shifted toward short wavelengths.",
      },
      {
        id: "b",
        text: "Intricate UV-absorbing 'nectar guides' radiating from the center, acting like an airport runway directly to the pollen.",
        isCorrect: true,
        explanation: "Correct! The central petals absorb UV light while the outer edges reflect it, creating a striking bullseye pattern only visible in UV.",
      },
      {
        id: "c",
        text: "The flowers appear twice as bright because bees have high-density tapetum lucidum mirrors.",
        isCorrect: false,
        explanation: "Incorrect. Bees have apposition compound eyes without a tapetum lucidum; they are strictly diurnal foragers.",
      },
    ],
    hint: "Look into the 300 - 400 nm wavelength range where human lenses are opaque but insect opsins peak.",
    learningOutcome: "RGB camera sensors discard UV light; simulating bee vision requires false-color models to visualize biological co-evolution.",
    speciesComparison: "Human (400-700 nm) vs. Honeybee (300-650 nm UV-Blue-Green)",
  },
  {
    id: "night-vision",
    title: "Challenge 3: Midnight Hunting Optics",
    scenarioDescription: "In a forest at 0.0001 lux (starlight on an overcast night), a field mouse scampers beneath leaf litter.",
    question: "How is a Barn Owl able to spot and target the mouse where a human sees pitch darkness?",
    options: [
      {
        id: "a",
        text: "The owl shoots laser-like beams of light from its tubular sclerotic rings.",
        isCorrect: false,
        explanation: "Incorrect. That is an ancient optical emission myth. Eyes only receive photons.",
      },
      {
        id: "b",
        text: "Enormous f/1.3 optics, a retina composed >95% of rods, and high contrast sensitivity allow photon-counting in extreme darkness.",
        isCorrect: true,
        explanation: "Correct! The owl's optical aperture collects up to 50-100x more light per unit area than human eyes, combined with acute auditory disc alignment.",
      },
      {
        id: "c",
        text: "The owl uses 12 hyperspectral color cones to distinguish colors at night.",
        isCorrect: false,
        explanation: "Incorrect. Photopic colors fade completely in scotopic darkness; the owl's vision is nearly monochromatic rod vision.",
      },
    ],
    hint: "Consider the trade-off between rod photoreceptors (night sensitivity) and cone photoreceptors (daylight color).",
    learningOutcome: "Nocturnal adaptation sacrifices daylight color acuity to maximize the probability of single photon capture.",
    speciesComparison: "Human (Scotopic threshold ~0.001 lux) vs. Barn Owl (~0.00001 lux)",
  },
  {
    id: "peripheral-motion",
    title: "Challenge 4: The 250 Hz Fly Swat",
    scenarioDescription: "You attempt to swat a common housefly on a table with a fast, sudden hand swing.",
    question: "Why does the housefly almost always evade a human swat before the hand lands?",
    options: [
      {
        id: "a",
        text: "Its Critical Flicker Fusion rate exceeds 250 Hz, meaning our swift hand swing looks like a sluggish, predictable slow-motion movie.",
        isCorrect: true,
        explanation: "Correct! With a temporal resolution of 250 Hz (vs human ~60 Hz), the fly sees four visual frames for every single frame human retinas process.",
      },
      {
        id: "b",
        text: "The fly has 140 cycles per degree acuity and resolves our fingerprints from 10 feet away.",
        isCorrect: false,
        explanation: "Incorrect. A fly's spatial acuity is very coarse (around 1.2 cpd); it detects sudden changes in optical flow rather than fine details.",
      },
      {
        id: "c",
        text: "The fly uses magnetic telepathy to anticipate our thoughts.",
        isCorrect: false,
        explanation: "Incorrect. Evading swats is purely visual-motor optic flow processing in the lobula plate.",
      },
    ],
    hint: "Recall how many visual updates per second the insect brain processes compared to humans.",
    learningOutcome: "Temporal resolution (CFF) dictates the perceived passage of time; high metabolic rates allow insects to experience a slower-moving world.",
    speciesComparison: "Human CFF (~60 Hz) vs. Housefly CFF (~250 Hz)",
  },
];

export function InteractiveChallenges() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [completedCount, setCompletedCount] = useState<number>(0);

  const handleSelectOption = (challengeId: string, optionId: string, isCorrect: boolean) => {
    if (showResults[challengeId]) return;

    setSelectedAnswers((prev) => ({ ...prev, [challengeId]: optionId }));
    setShowResults((prev) => ({ ...prev, [challengeId]: true }));

    if (isCorrect) {
      setCompletedCount((c) => {
        const next = c + 1;
        if (next === CHALLENGES_DATA.length) {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {}
        }
        return next;
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
    setCompletedCount(0);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Progress & Disclaimer Header */}
      <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold block">
            Scientific Perception Experiments
          </span>
          <h2 className="text-xl font-bold text-white">
            Score: {completedCount} / {CHALLENGES_DATA.length} Verified Discoveries
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        </div>
      </div>

      {/* Non-diagnostic Disclaimer */}
      <div className="p-4 rounded-xl bg-surface-300/60 border border-white/10 flex items-start gap-3 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Educational Notice:</strong> These interactive experiments demonstrate ecological perceptual principles. They are not medical visual tests and do not evaluate or diagnose human visual acuity or color deficiency.
        </p>
      </div>

      {/* Challenges List */}
      <div className="space-y-8">
        {CHALLENGES_DATA.map((ch, idx) => {
          const isAnswered = !!showResults[ch.id];
          const selectedId = selectedAnswers[ch.id];

          return (
            <div
              key={ch.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
                    {ch.speciesComparison}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{ch.title}</h3>
                </div>
                {isAnswered && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Experiment Completed
                  </span>
                )}
              </div>

              {/* Scenario Context */}
              <div className="p-4 rounded-xl bg-surface-300 border border-white/5 text-sm text-slate-200 leading-relaxed">
                <span className="font-semibold text-cyan-300 block mb-1 font-mono text-xs uppercase">
                  Field Scenario:
                </span>
                {ch.scenarioDescription}
              </div>

              {/* Question */}
              <h4 className="text-base font-semibold text-white">{ch.question}</h4>

              {/* Options */}
              <div className="space-y-3">
                {ch.options.map((opt) => {
                  const isSelected = selectedId === opt.id;
                  let btnStyle = "bg-surface-300/50 border-white/10 hover:border-cyan-400/50 text-slate-200";

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-200";
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = "bg-red-500/15 border-red-500 text-red-200";
                    } else {
                      btnStyle = "opacity-50 border-white/5 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(ch.id, opt.id, opt.isCorrect)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${btnStyle}`}
                    >
                      <div className="flex-1 text-sm leading-relaxed">
                        <span className="font-mono font-bold mr-2 text-cyan-400 uppercase">
                          {opt.id}.
                        </span>
                        {opt.text}
                      </div>
                      {isAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Biological Explanation */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-cyan-300 uppercase tracking-wide font-mono">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Scientific Insight & Takeaway:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    {ch.options.find((o) => o.id === selectedId)?.explanation}
                  </p>
                  <div className="pt-2 border-t border-cyan-500/20 text-slate-300">
                    <strong className="text-white">Core Principle: </strong>
                    {ch.learningOutcome}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
