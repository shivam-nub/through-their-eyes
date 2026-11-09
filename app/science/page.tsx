import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Compass,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";

export default function ScienceLibraryPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Neurobiology & Optical Physics</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          The Science Library
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The biological principles, mathematical color spaces, spatial frequency equations, and peer-reviewed literature underpinning our simulation engine.
        </p>
      </div>

      {/* Chapter 1: Eye Anatomy & Photoreceptors */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Retinal Neurobiology
            </span>
            <h2 className="text-2xl font-bold text-white">Photoreceptors: Rods & Cones</h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            Animal vision begins when incoming photons strike <strong>opsin photopigments</strong> housed in the membranous discs of retinal photoreceptors. Photoreceptors belong to two broad functional categories:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <li className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block font-mono text-sm">Cone Photoreceptors:</strong>
              <span>Operate in bright daylight (photopic). Cone opsins are tuned to narrow spectral bands (e.g. S, M, L). Neural comparison of signals across different cone classes gives rise to color discrimination.</span>
            </li>
            <li className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block font-mono text-sm">Rod Photoreceptors:</strong>
              <span>Operate in dim starlight (scotopic). Packed with rhodopsin photopigment, rods are single-photon detectors. Rods do not distinguish color; they yield monochrome contrast.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Chapter 2: Visual Acuity & Cycles Per Degree */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Spatial Frequency Resolution
            </span>
            <h2 className="text-2xl font-bold text-white">Visual Acuity: Cycles Per Degree</h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            In human optometry, sharpness is expressed as <em>20/20</em> Snellen notation. In comparative zoology, scientists measure spatial resolution in <strong>Cycles Per Degree (cpd)</strong>: the maximum number of alternating black and white line pairs an animal can distinguish within one degree of visual angle.
          </p>

          <div className="p-4 rounded-xl bg-surface-300 border border-white/10 text-xs text-slate-300 font-mono space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-white/10 text-slate-400 font-semibold">
              <span>Species</span>
              <span>Cycles Per Degree (cpd)</span>
              <span>Snellen Equivalent</span>
            </div>
            <div className="flex items-center justify-between text-cyan-300">
              <span>Golden Eagle (Aquila chrysaetos)</span>
              <span className="font-bold">140 cpd</span>
              <span>20/5 (Telephoto)</span>
            </div>
            <div className="flex items-center justify-between text-white">
              <span>Standard Human (Homo sapiens)</span>
              <span className="font-bold">60 cpd</span>
              <span>20/20 (Baseline)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Domestic Horse (Equus caballus)</span>
              <span className="font-bold">23 cpd</span>
              <span>20/30</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Domestic Dog (Canis lupus familiaris)</span>
              <span className="font-bold">12.6 cpd</span>
              <span>20/75</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Domestic Cat (Felis catus)</span>
              <span className="font-bold">6.0 cpd</span>
              <span>20/150</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Western Honeybee (Apis mellifera)</span>
              <span className="font-bold">1.5 cpd</span>
              <span>20/800 (Compound eye)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 3: Critical Flicker Fusion & Motion */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Temporal Processing
            </span>
            <h2 className="text-2xl font-bold text-white">Critical Flicker Fusion (CFF)</h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            The world does not move at the same speed for all creatures. The <strong>Critical Flicker Fusion Frequency (CFF)</strong> is the threshold at which an intermittent light flash ceases to appear as distinct pulses and merges into continuous illumination.
          </p>
          <p>
            Human eyes blend frames into smooth motion at approximately 50-60 Hz (which is why television screens refresh at 60 Hz). To a dog (CFF ~80 Hz), standard 60 Hz television flickers noticeably. To a housefly (CFF ~250 Hz), humans move in ponderous slow motion. Small animals with rapid metabolic rates and low body mass process more visual frames per second, allowing rapid evasive maneuvers.
          </p>
        </div>
      </div>

      {/* Chapter 4: Complete Peer-Reviewed Bibliography */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
              Academic Literature
            </span>
            <h2 className="text-2xl font-bold text-white">Primary Academic References</h2>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300 pt-2">
          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Cronin T.W., Marshall N.J. (1989)</p>
            <p className="italic text-cyan-300">Spectrally diverse photoreceptors in a mantis shrimp.</p>
            <p className="text-slate-400">Nature, 339(6221), 211–214.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Neitz J., Geist T., Jacobs G.H. (1989)</p>
            <p className="italic text-cyan-300">Color vision in the dog.</p>
            <p className="text-slate-400">Visual Neuroscience, 3(2), 119–125.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Reymond L. (1985)</p>
            <p className="italic text-cyan-300">Spatial visual acuity of the eagle Aquila audax: a behavioural study.</p>
            <p className="text-slate-400">Vision Research, 25(10), 1477–1491.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Stubbs A.L., Stubbs C.W. (2016)</p>
            <p className="italic text-cyan-300">Spectral discrimination in color blind animals via chromatic aberration and pupil shape.</p>
            <p className="text-slate-400">Proceedings of the National Academy of Sciences (PNAS), 113(29), 8206–8211.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">von Frisch K. (1967)</p>
            <p className="italic text-cyan-300">The dance language and orientation of bees.</p>
            <p className="text-slate-400">Harvard University Press, Cambridge, MA.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Land M.F. (1969)</p>
            <p className="italic text-cyan-300">Structure of the retinae of the principal eyes of jumping spiders in relation to visual acuity.</p>
            <p className="text-slate-400">Journal of Experimental Biology, 51(2), 443–470.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <p className="font-bold text-white">Gracheva E.O., et al. (2010)</p>
            <p className="italic text-cyan-300">Molecular basis of infrared detection by snakes.</p>
            <p className="text-slate-400">Nature, 464(7291), 1006–1011.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
