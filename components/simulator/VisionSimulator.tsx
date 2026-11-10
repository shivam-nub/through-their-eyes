"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  RotateCcw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sliders,
  Split,
  Eye,
  Info,
  Layers,
  ChevronRight,
  Search,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { SpeciesProfile } from "@/types/species";
import { SPECIES_CATALOGUE } from "@/data/species";
import { SAMPLE_SCENES, SampleScene } from "@/data/sample-scenes";
import { VisionRenderer } from "@/engine/renderer/VisionRenderer";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";

type ViewMode = "slider" | "split" | "overlay";
type InputType = "sample" | "upload" | "camera";

interface VisionSimulatorProps {
  initialSpeciesId?: string;
  initialSceneId?: string;
  className?: string;
}

export function VisionSimulator({
  initialSpeciesId = "dog",
  initialSceneId = "alpine-flowers",
  className = "",
}: VisionSimulatorProps) {
  // State: Selected species & input source
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(initialSpeciesId);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [infoViewMode, setInfoViewMode] = useState<"everyday" | "science">("everyday");
  const [inputType, setInputType] = useState<InputType>("sample");
  const [selectedSceneId, setSelectedSceneId] = useState<string>(initialSceneId);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // State: Viewing controls
  const [viewMode, setViewMode] = useState<ViewMode>("slider");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [overlayOpacity, setOverlayOpacity] = useState<number>(50); // percentage 0-100
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1x to 3x
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [stageDimensions, setStageDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 500,
  });

  // Camera state
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Active species object
  const currentSpecies: SpeciesProfile =
    SPECIES_CATALOGUE.find((s) => s.id === selectedSpeciesId) || SPECIES_CATALOGUE[0];

  // DOM Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistent Canvas Refs for each mode
  const sliderAnimalCanvasRef = useRef<HTMLCanvasElement>(null);
  const sliderHumanCanvasRef = useRef<HTMLCanvasElement>(null);

  const splitHumanCanvasRef = useRef<HTMLCanvasElement>(null);
  const splitAnimalCanvasRef = useRef<HTMLCanvasElement>(null);

  const overlayHumanCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayAnimalCanvasRef = useRef<HTMLCanvasElement>(null);

  // Dedicated Persistent VisionRenderers
  const sliderAnimalRenderer = useRef<VisionRenderer | null>(null);
  const sliderHumanRenderer = useRef<VisionRenderer | null>(null);

  const splitHumanRenderer = useRef<VisionRenderer | null>(null);
  const splitAnimalRenderer = useRef<VisionRenderer | null>(null);

  const overlayHumanRenderer = useRef<VisionRenderer | null>(null);
  const overlayAnimalRenderer = useRef<VisionRenderer | null>(null);

  // Track stage dimensions for exact pixel-perfect slider alignment
  useEffect(() => {
    if (!stageRef.current) return;
    const updateDims = () => {
      if (stageRef.current) {
        setStageDimensions({
          width: stageRef.current.clientWidth,
          height: stageRef.current.clientHeight,
        });
      }
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Initialize Renderers on Mount
  useEffect(() => {
    if (sliderAnimalCanvasRef.current && !sliderAnimalRenderer.current) {
      sliderAnimalRenderer.current = new VisionRenderer(sliderAnimalCanvasRef.current);
    }
    if (sliderHumanCanvasRef.current && !sliderHumanRenderer.current) {
      sliderHumanRenderer.current = new VisionRenderer(sliderHumanCanvasRef.current);
    }
    if (splitHumanCanvasRef.current && !splitHumanRenderer.current) {
      splitHumanRenderer.current = new VisionRenderer(splitHumanCanvasRef.current);
    }
    if (splitAnimalCanvasRef.current && !splitAnimalRenderer.current) {
      splitAnimalRenderer.current = new VisionRenderer(splitAnimalCanvasRef.current);
    }
    if (overlayHumanCanvasRef.current && !overlayHumanRenderer.current) {
      overlayHumanRenderer.current = new VisionRenderer(overlayHumanCanvasRef.current);
    }
    if (overlayAnimalCanvasRef.current && !overlayAnimalRenderer.current) {
      overlayAnimalRenderer.current = new VisionRenderer(overlayAnimalCanvasRef.current);
    }

    return () => {
      sliderAnimalRenderer.current?.dispose();
      sliderHumanRenderer.current?.dispose();
      splitHumanRenderer.current?.dispose();
      splitAnimalRenderer.current?.dispose();
      overlayHumanRenderer.current?.dispose();
      overlayAnimalRenderer.current?.dispose();
    };
  }, []);

  // Cleanup Camera on unmount or mode switch
  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stopCamera]);

  // Load and render static image to all active viewports
  const renderStaticSource = useCallback(() => {
    if (!loadedImageRef.current || !loadedImageRef.current.complete) return;
    const img = loadedImageRef.current;

    // Render for Slider mode
    sliderAnimalRenderer.current?.render(img, currentSpecies.shaderParams);
    sliderHumanRenderer.current?.render(img, null);

    // Render for Split mode
    splitHumanRenderer.current?.render(img, null);
    splitAnimalRenderer.current?.render(img, currentSpecies.shaderParams);

    // Render for Overlay mode
    overlayHumanRenderer.current?.render(img, null);
    overlayAnimalRenderer.current?.render(img, currentSpecies.shaderParams);
  }, [currentSpecies]);

  // Re-render when viewMode changes
  useEffect(() => {
    if (inputType !== "camera") {
      requestAnimationFrame(() => {
        renderStaticSource();
      });
    }
  }, [viewMode, renderStaticSource, inputType]);

  // Handle image loading for samples & uploads
  useEffect(() => {
    if (inputType === "camera") return;

    let src = "";
    if (inputType === "sample") {
      const scene = SAMPLE_SCENES.find((s) => s.id === selectedSceneId) || SAMPLE_SCENES[0];
      src = scene.imageUrl;
    } else if (inputType === "upload" && uploadedImageUrl) {
      src = uploadedImageUrl;
    }

    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImageRef.current = img;
      renderStaticSource();
    };
    img.onerror = () => {
      console.warn("Image load failed, attempting fallback");
    };
    img.src = src;
  }, [inputType, selectedSceneId, uploadedImageUrl, renderStaticSource]);

  // Handle species changes for static image
  useEffect(() => {
    if (inputType !== "camera") {
      renderStaticSource();
    }
  }, [selectedSpeciesId, inputType, renderStaticSource]);

  // Camera continuous loop
  useEffect(() => {
    if (inputType !== "camera" || !cameraActive || !videoRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let isRunning = true;
    const renderLoop = () => {
      if (!isRunning) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        if (viewMode === "slider") {
          sliderAnimalRenderer.current?.render(video, currentSpecies.shaderParams);
          sliderHumanRenderer.current?.render(video, null);
        } else if (viewMode === "split") {
          splitHumanRenderer.current?.render(video, null);
          splitAnimalRenderer.current?.render(video, currentSpecies.shaderParams);
        } else if (viewMode === "overlay") {
          overlayHumanRenderer.current?.render(video, null);
          overlayAnimalRenderer.current?.render(video, currentSpecies.shaderParams);
        }
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inputType, cameraActive, currentSpecies, viewMode]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setInputType("camera");
    } catch (err: any) {
      console.error("Camera access error:", err);
      let message = "Unable to access camera.";
      if (err.name === "NotAllowedError") {
        message = "Camera permission was denied. Please allow camera access in browser settings.";
      } else if (err.name === "NotFoundError") {
        message = "No compatible camera device found.";
      }
      setCameraError(message);
    }
  };

  // Flip Camera
  const flipCamera = () => {
    const nextFacing = cameraFacing === "user" ? "environment" : "user";
    setCameraFacing(nextFacing);
    if (cameraActive) {
      setTimeout(() => startCamera(), 100);
    }
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert("File is larger than 15MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadedImageUrl(result);
      setInputType("upload");
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop Handling
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImageUrl(event.target?.result as string);
        setInputType("upload");
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Slider Mouse/Touch drag
  const handleSliderMove = useCallback((clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    setSliderPosition(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider) handleSliderMove(e.clientX);
      if (isPanning) {
        setPanOffset((prev) => ({
          x: prev.x + (e.clientX - panStart.x),
          y: prev.y + (e.clientY - panStart.y),
        }));
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };
    const onMouseUp = () => {
      setIsDraggingSlider(false);
      setIsPanning(false);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider && e.touches[0]) handleSliderMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => setIsDraggingSlider(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDraggingSlider, isPanning, panStart, handleSliderMove]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Filtered Species List
  const filteredSpecies = SPECIES_CATALOGUE.filter((species) => {
    const matchesSearch =
      species.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || species.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Reset viewport
  const handleReset = () => {
    setSliderPosition(50);
    setOverlayOpacity(50);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Hidden elements for media sources */}
      <video ref={videoRef} playsInline muted autoPlay className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Controls Toolbar: Input Selection & View Modes */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border-white/10">
        {/* Source Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mr-1">
            Input:
          </span>
          <div className="inline-flex rounded-lg bg-surface-300 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setInputType("sample");
                stopCamera();
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                inputType === "sample"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Gallery
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                inputType === "upload"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Photo
            </button>
            <button
              type="button"
              onClick={() => {
                if (cameraActive) stopCamera();
                else startCamera();
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                inputType === "camera" && cameraActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm animate-pulse"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              {cameraActive ? "Camera (Active)" : "Live Camera"}
            </button>
          </div>

          {cameraActive && (
            <button
              type="button"
              onClick={flipCamera}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
              title="Flip Camera (Front/Rear)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mr-1">
            Display:
          </span>
          <div className="inline-flex rounded-lg bg-surface-300 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === "slider"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Interactive Comparison Slider"
            >
              <Sliders className="w-3.5 h-3.5" />
              Slider
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === "split"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Side-by-Side Split View"
            >
              <Split className="w-3.5 h-3.5" />
              Split
            </button>
            <button
              type="button"
              onClick={() => setViewMode("overlay")}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === "overlay"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Fade Overlay"
            >
              <Layers className="w-3.5 h-3.5" />
              Overlay
            </button>
          </div>
        </div>

        {/* Zoom & Viewport controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 min-w-10 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 ml-1"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 ml-1"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Camera Error Alert if any */}
      {cameraError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-300">Camera Notice</p>
            <p className="text-xs text-amber-200/80 mt-0.5">{cameraError}</p>
          </div>
          <button
            type="button"
            onClick={() => setCameraError(null)}
            className="text-xs underline text-amber-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Interactive Stage & Side Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Simulator Viewport Area */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div
            ref={stageRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl flex items-center justify-center select-none group"
            style={{ touchAction: "none" }}
          >
            {/* Viewport Canvas Containers with Zoom & Pan */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                cursor: zoomLevel > 1 ? (isPanning ? "grabbing" : "grab") : "default",
              }}
              onMouseDown={(e) => {
                if (zoomLevel > 1) {
                  setIsPanning(true);
                  setPanStart({ x: e.clientX, y: e.clientY });
                }
              }}
            >
              {/* Mode A: Comparison Slider Container */}
              <div className={`relative w-full h-full ${viewMode === "slider" ? "block" : "hidden"}`}>
                {/* Base Layer: Animal Vision (full canvas) */}
                <canvas
                  ref={sliderAnimalCanvasRef}
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Top Layer: Human Reference Vision (clipped by slider position) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <canvas
                    ref={sliderHumanCanvasRef}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{
                      width: stageDimensions.width ? `${stageDimensions.width}px` : "100%",
                      height: "100%",
                      maxWidth: "none",
                    }}
                  />
                </div>

                {/* Draggable Divider Bar */}
                <div
                  role="separator"
                  aria-label="Comparison divider"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 5));
                    if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 5));
                  }}
                  onMouseDown={() => setIsDraggingSlider(true)}
                  onTouchStart={() => setIsDraggingSlider(true)}
                  className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize group/slider focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  style={{ left: `calc(${sliderPosition}% - 16px)`, width: "32px" }}
                >
                  <div className="w-[2px] h-full bg-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.8)]" />
                  <div className="absolute w-8 h-8 rounded-full bg-surface-100 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.6)] flex items-center justify-center group-hover/slider:scale-110 transition-transform">
                    <Sliders className="w-4 h-4 text-cyan-300 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Mode B: Side-by-Side Split View Container */}
              <div
                className={`w-full h-full divide-x divide-white/20 ${
                  viewMode === "split" ? "grid grid-cols-2" : "hidden"
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                  <canvas
                    ref={splitHumanCanvasRef}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                    Standard Human Reference
                  </div>
                </div>
                <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                  <canvas
                    ref={splitAnimalCanvasRef}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur text-[11px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <span>{currentSpecies.commonName}</span>
                  </div>
                </div>
              </div>

              {/* Mode C: Overlay / Fade Container */}
              <div className={`relative w-full h-full ${viewMode === "overlay" ? "block" : "hidden"}`}>
                <canvas
                  ref={overlayHumanCanvasRef}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <canvas
                  ref={overlayAnimalCanvasRef}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-75"
                  style={{ opacity: overlayOpacity / 100 }}
                />
              </div>
            </div>

            {/* In-viewport View Badges */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-black/70 backdrop-blur border border-white/10 text-slate-300">
                {viewMode === "slider" ? (
                  <span>
                    <span className="text-cyan-300">Human</span> ⟷{" "}
                    <span className="text-cyan-400 font-semibold">{currentSpecies.commonName}</span>
                  </span>
                ) : viewMode === "split" ? (
                  <span>Side-by-Side Comparison</span>
                ) : (
                  <span>Overlay Fade Mode</span>
                )}
              </span>
              <EvidenceBadge level={currentSpecies.evidenceLevel} />
            </div>

            {/* In-viewport Overlay Fade Slider */}
            {viewMode === "overlay" && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl glass-panel-glow flex items-center gap-3">
                <span className="text-xs font-mono text-slate-300">Human</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-36 accent-cyan-400 cursor-pointer"
                />
                <span className="text-xs font-mono text-cyan-300 font-semibold">
                  {currentSpecies.commonName} ({overlayOpacity}%)
                </span>
              </div>
            )}
          </div>

          {/* Sample Gallery Selector (when in gallery mode) */}
          {inputType === "sample" && (
            <div className="glass-panel p-3.5 rounded-xl border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Curated Test Environments
                </span>
                <span className="text-[11px] text-slate-500">
                  Chosen to highlight specific opsin ranges & contrast
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SAMPLE_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`group text-left p-1.5 rounded-lg border transition-all ${
                      selectedSceneId === scene.id
                        ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(0,245,255,0.2)]"
                        : "border-white/10 hover:border-white/30 bg-surface-300/60"
                    }`}
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-1.5 bg-slate-800">
                      <img
                        src={scene.imageUrl}
                        alt={scene.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 truncate">{scene.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{scene.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Species Picker & Detailed Scientific Dossier */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Species Selector Card */}
          <div className="glass-panel p-4 rounded-xl border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
                Select Species
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                {filteredSpecies.length} available
              </span>
            </div>

            {/* Search and Category Tabs */}
            <div className="space-y-2 mb-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search species (e.g. dog, eagle, bee)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-300 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-none">
                {["all", "mammals", "birds", "insects", "reptiles", "aquatic"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize shrink-0 transition-colors ${
                      categoryFilter === cat
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "text-slate-400 hover:text-white bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Species List */}
            <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
              {filteredSpecies.map((species) => {
                const isSelected = species.id === selectedSpeciesId;
                return (
                  <button
                    key={species.id}
                    type="button"
                    onClick={() => setSelectedSpeciesId(species.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400 text-white shadow-sm"
                        : "bg-surface-300/40 border-white/5 text-slate-300 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-100">
                          {species.commonName}
                        </span>
                        <EvidenceBadge
                          level={species.evidenceLevel}
                          showTooltip={false}
                          className="scale-90"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 italic font-serif">
                        {species.scientificName}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-cyan-400 translate-x-0.5" : "text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Species Dossier Panel: Everyday vs Deep Science */}
          <div className="glass-panel p-5 rounded-2xl border-white/10 space-y-4">
            {/* Header & Mode Switcher */}
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold block">
                  Perception Profile
                </span>
                <h4 className="text-lg font-bold text-white">{currentSpecies.commonName}</h4>
                <p className="text-xs text-cyan-300/80 font-medium">{currentSpecies.friendlyTitle}</p>
              </div>
              <EvidenceBadge level={currentSpecies.evidenceLevel} />
            </div>

            {/* Toggle: Everyday View vs Deep Science */}
            <div className="flex rounded-lg bg-surface-300 p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setInfoViewMode("everyday")}
                className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all ${
                  infoViewMode === "everyday"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💡 Everyday View
              </button>
              <button
                type="button"
                onClick={() => setInfoViewMode("science")}
                className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all ${
                  infoViewMode === "science"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🔬 Deep Science
              </button>
            </div>

            {/* MODE 1: Everyday Learnable View (Clean, clear, zero jargon) */}
            {infoViewMode === "everyday" && (
              <div className="space-y-4">
                {/* In Plain English story card */}
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-100 space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-300 uppercase tracking-wider text-[10px] font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>In Plain English:</span>
                  </div>
                  <p className="text-slate-200">{currentSpecies.inPlainEnglish}</p>
                </div>

                {/* 4 Easy Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-300 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 block">🎨 Colors They See</span>
                    <p className="font-semibold text-slate-200 text-[11px] leading-snug">
                      {currentSpecies.friendlyColorSummary}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-300 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 block">🔍 Sharpness & Detail</span>
                    <p className="font-semibold text-slate-200 text-[11px] leading-snug">
                      {currentSpecies.friendlySharpness}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-300 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 block">🌙 Night Vision</span>
                    <p className="font-semibold text-slate-200 text-[11px] leading-snug">
                      {currentSpecies.friendlyNightVision}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-300 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 block">⚡ Reaction & Motion</span>
                    <p className="font-semibold text-slate-200 text-[11px] leading-snug">
                      {currentSpecies.friendlyMotion}
                    </p>
                  </div>
                </div>

                {/* Fun Fact Callout */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-300 block mb-0.5 text-[10px] font-mono uppercase">
                    ⭐ Mind-Blowing Fact:
                  </span>
                  <p className="text-amber-100/90">{currentSpecies.funFact}</p>
                </div>
              </div>
            )}

            {/* MODE 2: Deep Science View (For students, researchers, optics buffs) */}
            {infoViewMode === "science" && (
              <div className="space-y-4">
                {/* Quick Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-surface-300 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Acuity (Cycles/Deg)
                    </span>
                    <span className="text-sm font-bold font-mono text-cyan-300">
                      {currentSpecies.acuity.cyclesPerDegree} cpd
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Snellen: {currentSpecies.acuity.snellenEquivalent}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-300 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Photoreceptor Classes
                    </span>
                    <span className="text-sm font-bold font-mono text-cyan-300">
                      {currentSpecies.photoreceptors.count} Classes
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                      {currentSpecies.photoreceptors.type.split(" ")[0]}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-300 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Temporal (CFF)
                    </span>
                    <span className="text-sm font-bold font-mono text-cyan-300">
                      {currentSpecies.temporalResolution.cffHz} Hz
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Human: ~60 Hz
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-300 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Field of View
                    </span>
                    <span className="text-sm font-bold font-mono text-cyan-300">
                      {currentSpecies.fieldOfView.totalHorizontalDegrees}°
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Stereo: {currentSpecies.fieldOfView.binocularDegrees}°
                    </span>
                  </div>
                </div>

                {/* Opsin Spectral Sensitivities */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                    Photoreceptor Spectral Sensitivity (λ max):
                  </span>
                  <div className="space-y-1.5">
                    {currentSpecies.photoreceptors.classes.map((cls, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px] p-1.5 rounded bg-white/5 border border-white/5"
                      >
                        <span className="text-slate-300">{cls.name}</span>
                        <span className="font-mono text-cyan-400 font-semibold">{cls.peakNm} nm</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Rationale & Non-negotiable caveat */}
                <div className="p-3 rounded-lg bg-surface-300/80 border border-white/10 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Scientific Methodology</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    {currentSpecies.evidenceRationale}
                  </p>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 space-y-1">
                    <span className="font-semibold text-amber-400 block">Model Limitations:</span>
                    <ul className="list-disc pl-3 space-y-0.5">
                      {currentSpecies.scientificLimitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Academic Citations */}
                <div className="text-[11px] space-y-1.5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Primary Sources:
                  </span>
                  {currentSpecies.sources.map((src, i) => (
                    <div key={i} className="text-slate-400 leading-snug">
                      <span className="text-slate-200">{src.authors} ({src.year}).</span> &ldquo;{src.title}&rdquo;{" "}
                      {src.journal && <span className="italic">{src.journal}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
