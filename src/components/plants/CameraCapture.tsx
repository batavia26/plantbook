"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  isLoading?: boolean;
}

export function CameraCapture({ onCapture, isLoading }: CameraCaptureProps) {
  const [mode, setMode] = useState<"idle" | "camera" | "preview">("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode("camera");
    } catch (err) {
      alert("Unable to access camera. Please check permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMode("idle");
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setCapturedImage(dataUrl);
      setMode("preview");
      stopCamera();
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCapturedImage(result);
        setMode("preview");
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const reset = () => {
    setCapturedImage(null);
    setMode("idle");
  };

  const submitImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      {mode === "idle" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-plant-200 bg-plant-50/50 p-8 md:p-12">
          <div className="rounded-full bg-plant-100 p-6">
            <Camera className="h-10 w-10 text-plant-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-plant-900">
              Identify a Plant
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Take a photo or upload an image to identify any plant
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={startCamera} size="lg">
              <Camera className="mr-2 h-5 w-5" />
              Open Camera
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Photo
            </Button>
          </div>
        </div>
      )}

      {mode === "camera" && (
        <div className="relative camera-viewfinder">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-2xl"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={stopCamera}
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur"
            >
              <X className="h-5 w-5" />
            </Button>
            <button
              onClick={capturePhoto}
              className="h-16 w-16 rounded-full border-4 border-white bg-plant-600 shadow-lg transition-transform active:scale-90 hover:bg-plant-700"
            />
          </div>
        </div>
      )}

      {mode === "preview" && capturedImage && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={capturedImage}
              alt="Captured plant"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={reset} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake
            </Button>
            <Button
              onClick={submitImage}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Identifying...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Identify Plant
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
