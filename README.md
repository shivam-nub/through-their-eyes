# Through Their Eyes (Perception Simulator)

> **One world. Countless ways of seeing it.**  
> An immersive, science-led interactive web application exploring how different animal and bird species perceive the world through real-time WebGL vision simulations, comparisons, educational profiles, and carefully explained scientific limitations.

---

## 🔬 Core Scientific Principle
**Visual spectacle should attract visitors; scientific accuracy should make them trust the experience.**  
Simulations are evidence-labelled mathematical approximations based on electroretinography (ERG), optomotor tests, and micro-spectrophotometry. They do not claim to literally record an animal's subjective consciousness (*Umwelt*).

---

## ✨ Features

- **The Vision Lab**: Real-time GPU WebGL shader pipeline for processing visual perception.
  - **3 Input Modalities**: Curated sample environments, drag-and-drop local photo upload (JPG/PNG/WebP), and live camera stream with automatic device enumeration and clean track shutdown.
  - **4 Viewing Modes**: Interactive Comparison Slider, Side-by-Side Split View, Fade Overlay, and Fullscreen Inspection.
  - **Viewport Tools**: Up to 300% zoom and pan dragging for micro-detail inspection.
- **Species Catalogue (13 Documented Profiles)**:
  - **Mammals**: Domestic Dog (*Canis lupus familiaris*), Domestic Cat (*Felis catus*), Domestic Horse (*Equus caballus*), White-Tailed Deer (*Odocoileus virginianus*).
  - **Birds**: Golden Eagle (*Aquila chrysaetos*), Barn Owl (*Tyto alba*), Rock Pigeon (*Columba livia*).
  - **Insects**: Western Honeybee (*Apis mellifera*), Common Housefly (*Musca domestica*).
  - **Reptiles & Aquatic**: Veiled Chameleon (*Chamaeleo calyptratus*), Peacock Mantis Shrimp (*Odontodactylus scyllarus*), Common Octopus (*Octopus vulgaris*), Western Diamondback Rattlesnake (*Crotalus atrox*).
  - **Arachnids**: Jumping Spider (*Portia fimbriata*).
- **Multi-Species Comparison Mode**: Compare 2 to 4 species simultaneously on the identical scene.
- **Special Vision Modules**: Detailed scientific breakdowns of Ultraviolet floral nectar guides, Tapetum Lucidum retroreflectors, Loreal thermal pit organs (somatosensory distinction), and e-vector polarized light.
- **Perception Challenges**: 4 scenario-based experiments testing ecological perception principles.
- **Science Library**: Comprehensive guides on rods, cones, spectral opponency, Cycles Per Degree (cpd), Critical Flicker Fusion (CFF), and peer-reviewed literature.
- **100% Client-Side Privacy**: All processing runs locally in browser WebGL buffers. Zero photos or video streams are ever uploaded to a server.

---

## 🏷️ Evidence Taxonomy

| Badge | Meaning | Scientific Standard |
|---|---|---|
| **Established** | Empirical | Supported by direct ERG, micro-spectrophotometry, or operant behavioral tests. |
| **Modeled** | Approximation | Evidence-based mathematical models derived from measured biological traits with documented simplifications. |
| **Illustrative** | Conceptual | Educational visualizations representing non-RGB data channels (e.g. thermal infrared sensors). |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI / Language**: React 19, TypeScript
- **Styling**: Tailwind CSS, Dark Glassmorphism, Responsive Mobile & Desktop Layouts
- **Graphics Pipeline**: WebGL 2.0 / GLSL Custom Vertex & Fragment Shaders with 2D Canvas Fallbacks
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm

### Installation
```bash
git clone https://github.com/shivam-nub/through-their-eyes.git
cd through-their-eyes
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📜 Scientific Bibliography

- **Cronin T.W., Marshall N.J. (1989)** - *Spectrally diverse photoreceptors in a mantis shrimp.* Nature, 339, 211–214.
- **Neitz J., Geist T., Jacobs G.H. (1989)** - *Color vision in the dog.* Visual Neuroscience, 3, 119–125.
- **Reymond L. (1985)** - *Spatial visual acuity of the eagle Aquila audax: a behavioural study.* Vision Research, 25, 1477–1491.
- **Stubbs A.L., Stubbs C.W. (2016)** - *Spectral discrimination in color blind animals via chromatic aberration and pupil shape.* PNAS, 113, 8206–8211.
- **von Frisch K. (1967)** - *The dance language and orientation of bees.* Harvard University Press.
- **Land M.F. (1969)** - *Structure of the retinae of the principal eyes of jumping spiders.* Journal of Experimental Biology, 51, 443–470.
- **Gracheva E.O., et al. (2010)** - *Molecular basis of infrared detection by snakes.* Nature, 464, 1006–1011.

---

## 📄 License
MIT License. Created for educational and scientific exploration.
