import React from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Flame,
  Radio,
  Eye,
  ShieldAlert,
  Sparkles,
  Info,
  Waves,
  Zap,
  Activity,
} from "lucide-react";

export default function SpecialVisionPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Extraordinary Sensory Frontiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Special Vision & Alternate Senses
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Nature has invented sensory mechanisms radically unfamiliar to human experience. Here we explore ultraviolet sensitivity, retroreflective night optics, polarized navigation, and draw a strict scientific boundary between ocular vision and non-visual senses like thermal pit organs and echolocation.
        </p>
      </div>

      {/* Module 1: Ultraviolet Vision */}
      <div id="ultraviolet" className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-violet-400 font-semibold">
                Short-Wave Spectrum (300 - 400 nm)
              </span>
              <h2 className="text-2xl font-bold text-white">Ultraviolet Sensitivity & Floral Guides</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=honeybee"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-violet-400 hover:bg-violet-300 transition-colors"
          >
            Simulate Honeybee UV
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">The Biological Mechanism</h3>
            <p>
              Human corneas and crystalline lenses contain yellow pigment filters that absorb ultraviolet wavelengths below ~390 nm to protect our retinas from photochemical damage. Honeybees, butterflies, and many birds possess UV-transparent ocular media and dedicated UV-opsin cones (peaking between 340 nm and 370 nm).
            </p>
            <p>
              To a bee, a plain yellow evening primrose or buttercup is marked with a vivid ultraviolet bullseye pointing toward the nectar gland. This symbiotic visual signal directs pollinators straight to reproductive organs with zero wasted flight time.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Scientific Limitation & Data Boundary</span>
            </div>
            <p>
              Standard digital cameras use silicon CMOS sensors fitted with an infrared/ultraviolet cut filter (hot mirror) that deliberately discards wavelengths below ~390 nm. An ordinary RGB JPEG therefore contains <strong>zero actual ultraviolet reflectance data</strong>.
            </p>
            <p>
              In our simulator, UV effects are marked as <strong>MODELED</strong>. We employ a bio-optical heuristic that estimates typical angiosperm UV reflectance from the ratio of blue-green emission to red absorption, displaying reconstructed patterns in a visible false-color violet-cyan spectrum.
            </p>
          </div>
        </div>
      </div>

      {/* Module 2: Low-Light Vision & Tapetum Lucidum */}
      <div id="lowlight" className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                Scotopic Adaptation
              </span>
              <h2 className="text-2xl font-bold text-white">Tapetum Lucidum & Night Optics</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=cat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
          >
            Simulate Feline Night
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">The Retroreflector of the Retina</h3>
            <p>
              Have you ever seen a cat&apos;s eyes glow like emerald headlights in the dark? That reflection is caused by the <em>tapetum lucidum</em> (&ldquo;tapestry of light&rdquo;), a layer of tissue situated directly behind the photoreceptor outer segments.
            </p>
            <p>
              In human eyes, unabsorbed photons pass through the retina and are swallowed by the dark pigment epithelium. In cats, deer, and dogs, the tapetum acts as a biological mirror (made of zinc-cysteine or riboflavin crystals), bouncing unabsorbed photons back through the photoreceptors a second time. This effectively doubles quantum efficiency under starlight, at the slight expense of scattered optical blur.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-300 border border-white/10 space-y-2 text-xs text-slate-300">
            <h4 className="font-semibold text-cyan-300">The Purkinje Shift:</h4>
            <p>
              As ambient light drops from daylight (photopic) to twilight (mesopic) and night (scotopic), human and animal vision shifts from cone-dominated yellow-green (~555 nm) to rod-dominated cyan-blue (~500 nm). Colors fade into silver, blues appear brighter, and red tones turn dark and indistinguishable.
            </p>
          </div>
        </div>
      </div>

      {/* Module 3: Thermal Infrared Organs (Strict Non-Retinal Distinction) */}
      <div id="thermal" className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">
                Somatosensory Radiation
              </span>
              <h2 className="text-2xl font-bold text-white">Pit Viper Thermal Infrared Organs</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=pit-viper"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            Inspect Thermal Model
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300">CRITICAL SCIENTIFIC DISTINCTION: This is NOT Retinal Eyesight</strong>
            <p>
              Thermal infrared radiation (8,000 - 12,000 nm) has photons far too low in energy to excite retinal rhodopsin pigments. Rattlesnakes do not see heat through their eyes. They possess specialized <strong>facial loreal pit organs</strong> between their eyes and nostrils. Inside is a suspended 15-micrometer membrane packed with TRPA1 ion channels connected to the trigeminal somatosensory nerve. It is heat sensation, processed in the optic tectum to form an internal spatial heatmap.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">How The Pit Organ Functions</h3>
            <p>
              The pit operates like an optical pinhole camera, casting radiant warmth onto the nerve membrane with an angular resolution of roughly 5°. Sensitivity is astounding: pit vipers can detect temperature changes as small as 0.003 °C, allowing them to locate a warm mouse in pitch darkness.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white">Simulation Limitations</h3>
            <p>
              Since smartphone and web cameras do not have thermal microbolometer sensors, our pit viper simulation is marked strictly as <strong>ILLUSTRATIVE</strong>. We project an approximate thermographic ironbow gradient over luminance edges to communicate how bimodal neural convergence works.
            </p>
          </div>
        </div>
      </div>

      {/* Module 4: Polarized Light Perception */}
      <div id="polarization" className="glass-panel p-6 sm:p-8 rounded-3xl border-sky-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-sky-400 font-semibold">
                Vector Waves
              </span>
              <h2 className="text-2xl font-bold text-white">Polarized Light & Celestial Compasses</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=octopus"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-sky-400 hover:bg-sky-300 transition-colors"
          >
            Simulate Octopus Vision
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Electric Vector (e-vector) Alignment</h3>
            <p>
              Sunlight scattering through Earth&apos;s atmosphere becomes linearly polarized, forming concentric rings of electric-field vectors centered on the sun. While humans cannot perceive this pattern, bees, ants, and migratory birds have photoreceptors arranged in perpendicular microvilli grids that act as polarizers. Even under overcast skies, a bee only needs to see a tiny patch of blue sky to determine the exact azimuth of the sun for navigation.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Underwater Polarization in Cephalopods</h3>
            <p>
              In coastal ocean waters, octopuses and cuttlefish use orthogonal rhabdoms to detect polarization contrast. Many transparent zooplankton, jellyfish, and silvery fish are invisible under normal illumination, but disrupt water polarization, causing them to glow like bright beacons to a hunting octopus.
            </p>
          </div>
        </div>
      </div>

      {/* Module 5: Non-Visual Senses (Bat Echolocation & Electroreception) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
              Distinct Sensory Modalities
            </span>
            <h2 className="text-2xl font-bold text-white">Echolocation & Electroreception</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          We must not conflate all animal spatial awareness with eyesight. Bats possess functional eyes (contrary to the myth of blindness), but their primary flight targeting is <strong>biosonar echolocation</strong>: emitting high-frequency ultrasonic clicks (20 - 120 kHz) and calculating distance from microsecond acoustic echoes. Similarly, sharks use the Ampullae of Lorenzini to sense bioelectric fields (down to 5 nanovolts) emitted by prey heartbeats.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 pt-2">
          <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <strong className="text-white block font-mono">Bat Biosonar:</strong>
            <span>Acoustic delay, Doppler frequency shift, and pinna elevation decoding. Not retinal phototransduction.</span>
          </div>
          <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <strong className="text-white block font-mono">Shark Electroreception:</strong>
            <span>Gel-filled canal pores detecting microvolt galvanic gradients in conductive seawater.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
