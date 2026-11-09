export const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

export const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform mat3 u_colorMatrix;
uniform float u_blurRadius;
uniform float u_contrast;
uniform float u_brightness;
uniform float u_purkinje;
uniform float u_ommatidia;
uniform float u_uvFalseColor;
uniform float u_polarization;
uniform int u_colorMode;
uniform float u_panoramicPinch;

varying vec2 v_texCoord;

// Ironbow thermal false-color mapping
vec3 ironbow(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.05, 0.02, 0.15); // Deep Indigo
  vec3 c1 = vec3(0.55, 0.05, 0.65); // Magenta
  vec3 c2 = vec3(0.95, 0.25, 0.10); // Fiery Orange
  vec3 c3 = vec3(1.00, 0.85, 0.20); // Warm Yellow
  vec3 c4 = vec3(1.00, 1.00, 0.95); // White heat

  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

// Hexagonal ommatidia grid for compound eyes
vec2 hexCoord(vec2 uv, float count) {
  if (count <= 0.0) return uv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 st = uv * aspect * count;
  vec2 grid = floor(st);
  vec2 f = fract(st);
  
  // Quantize coordinates to facet centers
  vec2 center = (grid + 0.5) / (count * aspect);
  return center;
}

void main() {
  vec2 uv = v_texCoord;

  // Apply panoramic horizontal compression if specified (e.g. horse/deer horizontal visual streak)
  if (u_panoramicPinch > 0.0) {
    float dy = abs(uv.y - 0.5);
    uv.x = uv.x + (uv.x - 0.5) * dy * u_panoramicPinch * 0.4;
    uv.x = clamp(uv.x, 0.0, 1.0);
  }

  // Compound eye facet quantization
  if (u_ommatidia > 10.0) {
    uv = hexCoord(uv, u_ommatidia);
  }

  // Sample with Gaussian blur according to species spatial acuity
  vec4 color = vec4(0.0);
  vec2 pixelSize = 1.0 / u_resolution;

  if (u_blurRadius > 0.1) {
    float totalWeight = 0.0;
    // 9-tap 2D kernel
    for (float x = -2.0; x <= 2.0; x += 1.0) {
      for (float y = -2.0; y <= 2.0; y += 1.0) {
        float weight = exp(-(x*x + y*y) / (2.0 * max(0.5, u_blurRadius * 0.4)));
        vec2 offset = vec2(x, y) * pixelSize * u_blurRadius;
        color += texture2D(u_image, clamp(uv + offset, 0.0, 1.0)) * weight;
        totalWeight += weight;
      }
    }
    color /= totalWeight;
  } else {
    color = texture2D(u_image, uv);
  }

  vec3 rgb = color.rgb;

  // Mode 1: Thermal Sensor Approximation (Pit Viper)
  if (u_colorMode == 1) {
    float luminance = dot(rgb, vec3(0.299, 0.587, 0.114));
    // Soft vignette and high-luminance boost for warm bodies
    float heat = pow(luminance, 0.85) * 1.2;
    rgb = ironbow(heat);
    gl_FragColor = vec4(rgb, 1.0);
    return;
  }

  // Mode 2: Monochromatic Polarization (Octopus)
  if (u_colorMode == 2) {
    float lum = dot(rgb, vec3(0.2126, 0.7152, 0.0722));
    // Approximate linear polarization contrast at surface gradients
    vec4 colRight = texture2D(u_image, uv + vec2(pixelSize.x * 2.0, 0.0));
    vec4 colUp = texture2D(u_image, uv + vec2(0.0, pixelSize.y * 2.0));
    float dx = dot(colRight.rgb, vec3(0.333)) - lum;
    float dy = dot(colUp.rgb, vec3(0.333)) - lum;
    float polEdge = sqrt(dx * dx + dy * dy) * u_polarization * 4.0;
    
    // Cyan-dominant underwater monochromatic spectrum with polarization highlights
    vec3 baseMono = vec3(lum * 0.4, lum * 0.75, lum * 0.95);
    rgb = mix(baseMono, vec3(0.2, 0.95, 1.0), clamp(polEdge, 0.0, 1.0));
  }
  // Mode 3: Honeybee UV-Shifted Trichromacy
  else if (u_colorMode == 3) {
    // Bees are blind to pure red (>650 nm)
    float redComponent = rgb.r;
    float greenComponent = rgb.g;
    float blueComponent = rgb.b;
    
    // UV floral guide heuristic: flower stamens and white petals reflect UV strongly
    float uvHeuristic = max(0.0, (blueComponent + greenComponent) * 0.7 - redComponent * 0.4);
    
    // Map bee cone signals: UV -> displayed as Violet/Cyan, Blue -> Blue, Green -> Yellow-Green
    vec3 beeRgb;
    beeRgb.r = uvHeuristic * u_uvFalseColor * 0.8;
    beeRgb.g = greenComponent * 0.85 + uvHeuristic * 0.3;
    beeRgb.b = blueComponent * 0.95 + uvHeuristic * 0.6;
    
    // Suppress pure red into dark charcoal/brown
    beeRgb *= (1.0 - redComponent * 0.35);
    rgb = beeRgb;
  }
  // Standard Color Matrix Transformation (Dichromats, Tetrachromats, etc.)
  else {
    rgb = u_colorMatrix * rgb;
  }

  // Purkinje Shift: Under scotopic twilight, rod sensitivity shifts spectral peak to ~500 nm cyan
  if (u_purkinje > 0.01) {
    float rodLum = dot(rgb, vec3(0.1, 0.6, 0.3));
    vec3 scotopicTint = vec3(rodLum * 0.5, rodLum * 0.8, rodLum * 1.0);
    rgb = mix(rgb, scotopicTint, u_purkinje);
  }

  // Contrast & Brightness adjustments
  rgb = (rgb - 0.5) * u_contrast + 0.5;
  rgb = rgb * u_brightness;

  // Subtle ommatidia facet shadow border if compound eye is enabled
  if (u_ommatidia > 10.0) {
    vec2 st = v_texCoord * vec2(u_resolution.x / u_resolution.y, 1.0) * u_ommatidia;
    vec2 f = fract(st) - 0.5;
    float dist = length(f);
    float facetBorder = smoothstep(0.42, 0.48, dist);
    rgb = mix(rgb, rgb * 0.6, facetBorder * 0.6);
  }

  gl_FragColor = vec4(clamp(rgb, 0.0, 1.0), 1.0);
}
`;
