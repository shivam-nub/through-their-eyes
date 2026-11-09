export type EvidenceLevel = "established" | "modeled" | "illustrative";

export type SpeciesCategory =
  | "mammals"
  | "birds"
  | "insects"
  | "reptiles"
  | "aquatic"
  | "arachnids";

export interface PhotoreceptorInfo {
  type: string;
  count: number;
  classes: Array<{
    name: string;
    peakNm: number;
    colorBand: string;
    description: string;
  }>;
  sourceIds: string[];
}

export interface AcuityInfo {
  cyclesPerDegree: number;
  snellenEquivalent: string;
  relativeToHumanRatio: number; // e.g. 2.5 for eagle (higher resolution), 0.2 for dog
  conditions: string;
  description: string;
  uncertainty?: string;
}

export interface LowLightInfo {
  tapetumLucidum: boolean;
  sensitivityMultiplier: number;
  evidence: string;
  description: string;
}

export interface FieldOfViewInfo {
  totalHorizontalDegrees: number;
  binocularDegrees: number;
  verticalDegrees: number;
  eyePlacement: "frontal" | "lateral" | "asymmetric" | "compound";
  description: string;
}

export interface TemporalResolutionInfo {
  cffHz: number; // Critical Flicker Fusion frequency (Hz)
  relativeSpeedDescription: string;
  evidence: string;
}

export interface Citation {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  doiOrUrl?: string;
}

export interface ShaderParameters {
  colorTransformMatrix: number[]; // 3x3 or 4x4 matrix serialized as array of 9/16 numbers
  colorMode:
    | "human"
    | "dichromat_canine"
    | "dichromat_feline"
    | "dichromat_ungulate"
    | "tetrachromat_uv_avian"
    | "tetrachromat_uv_bee"
    | "compound_ommatidia"
    | "nocturnal_scotopic"
    | "monochromat_polarization"
    | "hyperspectral_stomatopod"
    | "thermal_sensor_approximation";
  acuityCyclesPerDegree: number;
  acuityBlurRadius: number; // normalized 0.0 - 15.0
  contrastEnhancement: number; // default 1.0
  lowLightAmplification: number; // 1.0 = normal
  purkinjeBlueShift: number; // 0.0 - 1.0
  ommatidiaCount: number; // 0 = standard lens, >0 = compound eye facet resolution
  panoramicAspectDistortion: number; // 0 = normal circular, 1.0 = wide lateral compression
  uvFalseColorIntensity: number; // 0.0 - 1.0
  polarizationAngleContrast: number;
}

export interface SpeciesProfile {
  id: string;
  commonName: string;
  scientificName: string;
  category: SpeciesCategory;
  shortDescription: string;
  ecologicalNiche: string;
  taxonomicFamily: string;
  evidenceLevel: EvidenceLevel;
  evidenceRationale: string;
  summary: string;
  photoreceptors: PhotoreceptorInfo;
  acuity: AcuityInfo;
  lowLight: LowLightInfo;
  fieldOfView: FieldOfViewInfo;
  temporalResolution: TemporalResolutionInfo;
  specialAdaptations: string[];
  scientificAssumptions: string[];
  scientificLimitations: string[];
  sources: Citation[];
  shaderParams: ShaderParameters;
  iconName: string;
  featuredQuote: string;
}
