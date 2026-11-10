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
  Waves,
  Lightbulb,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function SpecialVisionPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Extraordinary Animal Senses</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Special Vision & Secret Senses
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Nature has invented perception superpowers far beyond human experience. Discover ultraviolet flower runways, glowing night-vision mirrors, and heat-sensing facial pits — broken down into simple, fun analogies alongside real biology.
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
                Secret UV Color (300 - 400 nm)
              </span>
              <h2 className="text-2xl font-bold text-white">Ultraviolet Vision & Nature&apos;s Airport Runways</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=honeybee"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-violet-400 hover:bg-violet-300 transition-colors"
          >
            Simulate Honeybee UV
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Everyday Analogy Callout */}
        <div className="p-4 rounded-2xl bg-violet-950/40 border border-violet-500/30 flex items-start gap-3 text-xs text-violet-200">
          <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block text-sm mb-1">Everyday Analogy: Airport Landing Lights for Bees</strong>
            <p>
              To your human eyes, a dandelion or sunflower looks like a plain yellow circle. But to a bee, the flower has a glowing ultraviolet bullseye pointing directly into the nectar bowl! Plants evolved this secret visual code so bees land right on the pollen without wasting a single second.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Why Can&apos;t Humans See It?</h3>
            <p className="text-xs sm:text-sm">
              The human eye has natural yellow-tinted lenses that block UV light to protect our delicate retinas from sun damage. Honeybees, butterflies, and many birds have crystal-clear eye lenses plus a special fourth color sensor tuned specifically to UV light waves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4" />
              <span>How We Simulate This Honestly</span>
            </div>
            <p>
              Normal phone and camera lenses filter out UV light, so photos don&apos;t actually contain raw UV data. In our simulator, we use a biological formula that estimates where flowers reflect UV and renders it in visible false-color neon violet so human screens can display it.
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
                Night Vision Optics
              </span>
              <h2 className="text-2xl font-bold text-white">The Built-In Eye Mirror (Tapetum Lucidum)</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=cat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
          >
            Simulate Cat Night Sight
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Everyday Analogy Callout */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-200">
          <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block text-sm mb-1">Everyday Analogy: Why Animal Eyes Glow Like Headlights</strong>
            <p>
              Ever shine a flashlight at your dog or cat at night and see their eyes glow green or gold? That is the <em>Tapetum Lucidum</em> — Latin for &ldquo;tapestry of light&rdquo;. It is a biological mirror located right behind the retina. When light enters, whatever isn&apos;t caught the first time bounces right back through for a second chance!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Double the Light, Half the Sharpness</h3>
            <p className="text-xs sm:text-sm">
              Because light passes through the photoreceptors twice, cats and dogs can see in 1/6th the light a human needs. The trade-off? The bouncing light scatters slightly, making their night vision fuzzier around the edges.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-300 border border-white/10 space-y-2 text-xs text-slate-300">
            <h4 className="font-semibold text-cyan-300">Why Night Looks Blue (The Purkinje Shift):</h4>
            <p>
              In dim twilight, our daylight color cones shut down and sensitive night rods take over. Because night rods are tuned to blue-green light, reds and oranges turn into pitch dark shadows, while pale blues stand out clearly.
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
                Heat Perception (Non-Visual)
              </span>
              <h2 className="text-2xl font-bold text-white">Pit Viper Thermal Heat Sensors</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=pit-viper"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            Simulate Thermal Vision
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Big Alert: Clarifying the Myth */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300 text-sm block">Myth Buster: Snakes Do NOT &ldquo;See&rdquo; Heat With Their Eyes</strong>
            <p>
              Thermal infrared heat waves are too weak to stimulate regular eye cells. Rattlesnakes actually have two tiny pinholes between their eyes and nostrils called <strong>pit organs</strong>. Inside is a heat-sensitive membrane connected to touch/temperature nerves. The snake&apos;s brain merges this thermal heat-map on top of its normal blurry eyesight, like built-in night vision goggles!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">How Sensitive Are They?</h3>
            <p className="text-xs sm:text-sm">
              A pit viper can detect temperature differences as tiny as <strong>0.003 °C</strong>! That means even in a pitch-black cave, a motionless warm mouse radiates like a glowing beacon.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white">How We Show It In the Lab</h3>
            <p className="text-xs sm:text-sm">
              Because standard computer webcams don&apos;t detect thermal radiation, our pit viper simulation uses an illustrative thermal color map (blues for cooler areas, bright oranges and whites for warm focal points) so you can experience this dual-sense hunting view.
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
                Invisible Light Angles
              </span>
              <h2 className="text-2xl font-bold text-white">The Sky Compass (Polarized Light)</h2>
            </div>
          </div>
          <Link
            href="/simulator?species=octopus"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-black bg-sky-400 hover:bg-sky-300 transition-colors"
          >
            Simulate Octopus
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Everyday Analogy Callout */}
        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-start gap-3 text-xs text-sky-200">
          <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block text-sm mb-1">Everyday Analogy: Built-In Polarized Sunglasses</strong>
            <p>
              Light waves vibrate in all directions. When sunlight hits the atmosphere or reflects off water, it vibrates in straight lines (polarized light). While humans can only see polarization if we put on polarized fishing sunglasses, insects and octopuses have polarized filters built straight into their eyes!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Navigating on Overcast Days</h3>
            <p className="text-xs sm:text-sm">
              Even behind thick cloud cover, polarization patterns in the sky reveal the exact position of the sun. Desert ants and honeybees use this celestial compass to march miles away for food and find their way straight home without getting lost.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Seeing Through Water Camouflage</h3>
            <p className="text-xs sm:text-sm">
              Under the ocean, octopuses and cuttlefish use polarization to spot transparent jellyfish and silvery fish. While these creatures are nearly invisible to humans in underwater haze, to an octopus they shine brightly because they disrupt the water&apos;s natural light polarization.
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
              Distinct Sensory Worlds
            </span>
            <h2 className="text-2xl font-bold text-white">Sound Radar & Heartbeat Detectors</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Not all animal navigation relies on eyes! Bats actually have functional eyes (the phrase &ldquo;blind as a bat&rdquo; is a myth), but they navigate pitch-black caves using <strong>echolocation</strong>: shouting ultrasonic clicks and listening for tiny echoes bounce back in microseconds. Sharks have gel-filled pores on their snouts that sense the faint electrical voltage produced by a fish&apos;s beating heart.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <strong className="text-emerald-300 block font-bold text-sm">🦇 Bat Echolocation (Biosonar):</strong>
            <span>High-frequency sound waves (20,000 - 120,000 Hz) that form a 3D acoustic mental map.</span>
          </div>
          <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
            <strong className="text-emerald-300 block font-bold text-sm">🦈 Shark Electroreception:</strong>
            <span>Electrical pores that detect 5-nanovolt electrical signals from swimming prey hidden under sand.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
