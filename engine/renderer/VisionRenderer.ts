import { ShaderParameters } from "@/types/species";
import { FRAGMENT_SHADER_SOURCE, VERTEX_SHADER_SOURCE } from "../shaders/visionShaders";

export class VisionRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private texture: WebGLTexture | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;
  private isWebGLSupported = true;
  private isDisposed = false;

  // Uniform locations cache
  private uniforms: Record<string, WebGLUniformLocation | null> = {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initWebGL();
  }

  private initWebGL() {
    try {
      const gl =
        this.canvas.getContext("webgl", {
          preserveDrawingBuffer: true,
          premultipliedAlpha: false,
          alpha: false,
          antialias: true,
        }) ||
        (this.canvas.getContext("experimental-webgl") as WebGLRenderingContext);

      if (!gl) {
        console.warn("WebGL not supported, falling back to 2D context.");
        this.isWebGLSupported = false;
        return;
      }

      this.gl = gl;
      const program = this.createProgram(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
      if (!program) {
        this.isWebGLSupported = false;
        return;
      }

      this.program = program;
      gl.useProgram(program);

      // Cache uniform locations
      const uniformNames = [
        "u_image",
        "u_resolution",
        "u_colorMatrix",
        "u_blurRadius",
        "u_contrast",
        "u_brightness",
        "u_purkinje",
        "u_ommatidia",
        "u_uvFalseColor",
        "u_polarization",
        "u_colorMode",
        "u_panoramicPinch",
      ];
      for (const name of uniformNames) {
        this.uniforms[name] = gl.getUniformLocation(program, name);
      }

      // Setup full quad geometry [-1, 1]
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]);

      // UV coordinates (flip Y for standard WebGL texture coordinates)
      const texCoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        0, 0,
        1, 1,
        1, 0,
      ]);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      this.positionBuffer = positionBuffer;

      const aPosition = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      this.texCoordBuffer = texCoordBuffer;

      const aTexCoord = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(aTexCoord);
      gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

      // Create texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      this.texture = texture;
    } catch (e) {
      console.error("Failed to initialize VisionRenderer WebGL pipeline:", e);
      this.isWebGLSupported = false;
    }
  }

  private createShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
    const gl = this.gl;
    if (!gl) return null;
    const vs = this.createShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

  public render(
    source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    params: ShaderParameters | null, // null means standard human vision
    width?: number,
    height?: number
  ) {
    if (this.isDisposed) return;

    const targetWidth = width || (source instanceof HTMLVideoElement ? source.videoWidth : source.width) || 800;
    const targetHeight = height || (source instanceof HTMLVideoElement ? source.videoHeight : source.height) || 600;

    if (this.canvas.width !== targetWidth || this.canvas.height !== targetHeight) {
      this.canvas.width = targetWidth;
      this.canvas.height = targetHeight;
    }

    if (!this.isWebGLSupported || !this.gl || !this.program) {
      this.render2DFallback(source, params, targetWidth, targetHeight);
      return;
    }

    const gl = this.gl;
    gl.viewport(0, 0, targetWidth, targetHeight);
    gl.useProgram(this.program);

    // Update texture from image or video frame
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

    if (this.uniforms.u_image) {
      gl.uniform1i(this.uniforms.u_image, 0);
    }
    if (this.uniforms.u_resolution) {
      gl.uniform2f(this.uniforms.u_resolution, targetWidth, targetHeight);
    }

    if (!params) {
      // Standard Human Vision reference mode (identity)
      if (this.uniforms.u_colorMatrix) {
        gl.uniformMatrix3fv(this.uniforms.u_colorMatrix, false, new Float32Array([
          1, 0, 0,
          0, 1, 0,
          0, 0, 1,
        ]));
      }
      if (this.uniforms.u_blurRadius) gl.uniform1f(this.uniforms.u_blurRadius, 0.0);
      if (this.uniforms.u_contrast) gl.uniform1f(this.uniforms.u_contrast, 1.0);
      if (this.uniforms.u_brightness) gl.uniform1f(this.uniforms.u_brightness, 1.0);
      if (this.uniforms.u_purkinje) gl.uniform1f(this.uniforms.u_purkinje, 0.0);
      if (this.uniforms.u_ommatidia) gl.uniform1f(this.uniforms.u_ommatidia, 0.0);
      if (this.uniforms.u_uvFalseColor) gl.uniform1f(this.uniforms.u_uvFalseColor, 0.0);
      if (this.uniforms.u_polarization) gl.uniform1f(this.uniforms.u_polarization, 0.0);
      if (this.uniforms.u_colorMode) gl.uniform1i(this.uniforms.u_colorMode, 0);
      if (this.uniforms.u_panoramicPinch) gl.uniform1f(this.uniforms.u_panoramicPinch, 0.0);
    } else {
      // Pass species-specific shader parameters
      if (this.uniforms.u_colorMatrix) {
        gl.uniformMatrix3fv(
          this.uniforms.u_colorMatrix,
          false,
          new Float32Array(params.colorTransformMatrix)
        );
      }
      if (this.uniforms.u_blurRadius) gl.uniform1f(this.uniforms.u_blurRadius, params.acuityBlurRadius);
      if (this.uniforms.u_contrast) gl.uniform1f(this.uniforms.u_contrast, params.contrastEnhancement);
      if (this.uniforms.u_brightness) gl.uniform1f(this.uniforms.u_brightness, params.lowLightAmplification);
      if (this.uniforms.u_purkinje) gl.uniform1f(this.uniforms.u_purkinje, params.purkinjeBlueShift);
      if (this.uniforms.u_ommatidia) gl.uniform1f(this.uniforms.u_ommatidia, params.ommatidiaCount);
      if (this.uniforms.u_uvFalseColor) gl.uniform1f(this.uniforms.u_uvFalseColor, params.uvFalseColorIntensity);
      if (this.uniforms.u_polarization) gl.uniform1f(this.uniforms.u_polarization, params.polarizationAngleContrast);
      if (this.uniforms.u_panoramicPinch) gl.uniform1f(this.uniforms.u_panoramicPinch, params.panoramicAspectDistortion);

      let modeInt = 0;
      if (params.colorMode === "thermal_sensor_approximation") modeInt = 1;
      else if (params.colorMode === "monochromat_polarization") modeInt = 2;
      else if (params.colorMode === "tetrachromat_uv_bee") modeInt = 3;
      if (this.uniforms.u_colorMode) gl.uniform1i(this.uniforms.u_colorMode, modeInt);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  private render2DFallback(
    source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    params: ShaderParameters | null,
    width: number,
    height: number
  ) {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (!params) {
      ctx.filter = "none";
      ctx.drawImage(source, 0, 0, width, height);
      return;
    }

    // Compose CSS filters that approximate the species model
    const blurPx = Math.round(params.acuityBlurRadius * 0.8);
    const contrastPct = Math.round(params.contrastEnhancement * 100);
    const brightnessPct = Math.round(params.lowLightAmplification * 100);

    let filterStr = `blur(${blurPx}px) contrast(${contrastPct}%) brightness(${brightnessPct}%)`;

    if (params.colorMode.includes("dichromat")) {
      filterStr += " sepia(0.3) saturate(0.6)";
    } else if (params.colorMode === "nocturnal_scotopic") {
      filterStr += " grayscale(0.85) hue-rotate(190deg)";
    }

    ctx.filter = filterStr;
    ctx.drawImage(source, 0, 0, width, height);
    ctx.filter = "none";
  }

  public dispose() {
    this.isDisposed = true;
    if (this.gl) {
      if (this.texture) this.gl.deleteTexture(this.texture);
      if (this.positionBuffer) this.gl.deleteBuffer(this.positionBuffer);
      if (this.texCoordBuffer) this.gl.deleteBuffer(this.texCoordBuffer);
      if (this.program) this.gl.deleteProgram(this.program);
    }
  }
}
