export interface SampleScene {
  id: string;
  title: string;
  category: "flowers" | "wildlife" | "nocturnal" | "marine" | "landscape";
  description: string;
  scientificRelevance: string;
  recommendedSpecies: string[];
  imageUrl: string;
  fallbackSvgPattern: "meadow" | "forest" | "night" | "reef" | "plains";
}

export const SAMPLE_SCENES: SampleScene[] = [
  {
    id: "alpine-flowers",
    title: "Alpine Meadow & Wildflowers",
    category: "flowers",
    description: "Sunlit yellow, purple, and white wildflowers with rich nectar and pollen centers.",
    scientificRelevance: "Demonstrates UV nectar guides visible to bees and raptors, and red-green collapse in canine/feline dichromats.",
    recommendedSpecies: ["honeybee", "golden-eagle", "dog", "housefly"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    fallbackSvgPattern: "meadow",
  },
  {
    id: "forest-canopy",
    title: "Autumn Forest & Blaze Foliage",
    category: "wildlife",
    description: "Dense woodland with golden-red foliage, deep shadows, and subtle brush details.",
    scientificRelevance: "Reveals how deer fail to distinguish red/orange from green foliage, and how cats track branch twitches.",
    recommendedSpecies: ["white-tailed-deer", "cat", "chameleon", "pit-viper"],
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    fallbackSvgPattern: "forest",
  },
  {
    id: "nocturnal-city",
    title: "Midnight Alley & Moonlight",
    category: "nocturnal",
    description: "Dimly lit cobblestone street under moonlight with deep shadows and subtle light sources.",
    scientificRelevance: "Illustrates nocturnal rod amplification, tapetum lucidum reflectance in cats, and the owl's high-contrast night vision.",
    recommendedSpecies: ["barn-owl", "cat", "dog"],
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    fallbackSvgPattern: "night",
  },
  {
    id: "coral-reef",
    title: "Shallow Tropical Coral Reef",
    category: "marine",
    description: "Vibrant coral heads, sunbeams filtering through seawater, and translucent marine organisms.",
    scientificRelevance: "Highlights mantis shrimp hyperspectral mid-band channels and octopus polarization sensitivity revealing translucent prey.",
    recommendedSpecies: ["mantis-shrimp", "octopus"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    fallbackSvgPattern: "reef",
  },
  {
    id: "open-grassland",
    title: "Open Savanna Horizon",
    category: "landscape",
    description: "Expansive plains stretching to a distant mountain ridge under bright daytime sky.",
    scientificRelevance: "Demonstrates horse 350° panoramic horizon scanning, eagle 140 cpd telephoto resolution, and pigeon dual-field vision.",
    recommendedSpecies: ["horse", "golden-eagle", "pigeon", "jumping-spider"],
    imageUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    fallbackSvgPattern: "plains",
  },
];
