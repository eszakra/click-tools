import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ImageIcon, Sparkles } from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import QualitySlider from "../components/QualitySlider";
import ToggleButton from "../components/ToggleButton";
import Logo from "../components/Logo";

export default function ImageDownscaler() {
  const [quality, setQuality] = useState(0); // Slider starts at 0 (best quality)
  const [jpegArtifacts, setJpegArtifacts] = useState(false);
  const [webpArtifacts, setWebpArtifacts] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      generateOptimizedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const generateOptimizedImage = useCallback(
    (imageData: string) => {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Quality logic: 0 = best quality, 100 = worst quality
        const adjustedQuality = 1 - quality / 100;
        const mimeType = webpArtifacts ? "image/webp" : "image/jpeg";
        const compressedImage = canvas.toDataURL(mimeType, adjustedQuality);

        setOptimizedImage(compressedImage);
      };
    },
    [quality, jpegArtifacts, webpArtifacts]
  );

  useEffect(() => {
    if (originalImage) {
      generateOptimizedImage(originalImage);
    }
  }, [quality, jpegArtifacts, webpArtifacts, originalImage, generateOptimizedImage]);

  const handleToggle = (type: "jpeg" | "webp") => {
    if (type === "jpeg") {
      setJpegArtifacts(!jpegArtifacts);
      if (!jpegArtifacts) setWebpArtifacts(false);
    } else if (type === "webp") {
      setWebpArtifacts(!webpArtifacts);
      if (!webpArtifacts) setJpegArtifacts(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex items-center border-b border-pink-500/10">
        <Link
          to="/"
          className="flex items-center text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Hub
        </Link>
        <div className="mx-auto flex items-center">
          <Logo />
          <h1 className="ml-4 text-2xl font-bold">Image Downscaler</h1>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Image */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-500" />
              Original Image
            </h2>
            <ImageUploader
              onImageUpload={handleImageUpload}
              image={originalImage}
              className="min-h-[400px] bg-black/20"
            />
          </div>

          {/* Optimized Image */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              Optimized Image
            </h2>
            <div
              className={`relative rounded-lg border-2 border-dashed border-white/10 
              min-h-[400px] flex items-center justify-center overflow-hidden 
              bg-black/20 transition-all duration-300`}
            >
              {optimizedImage ? (
                <img
                  src={optimizedImage}
                  alt="Optimized"
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <p className="text-white/60">Optimized image will appear here</p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = optimizedImage || "#";
                  link.download = "optimized-image.jpg";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className={`w-full bg-gradient-to-r from-[#FF007A] to-[#FF66B2] text-white py-3 px-6 rounded-lg font-medium 
                  flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg 
                  hover:shadow-pink-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={!optimizedImage}
              >
                Save Optimized Image
              </button>
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="mt-12 p-6 rounded-lg bg-black/40 border border-white/10">
          <h3 className="text-lg font-semibold mb-6">Optimization Settings</h3>

          <div className="space-y-8">
            <QualitySlider value={quality} onChange={setQuality} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToggleButton
                label="JPEG Artifacts"
                description="Simulates compression artifacts typical in JPEG images"
                isActive={jpegArtifacts}
                onChange={() => handleToggle("jpeg")}
              />
              <ToggleButton
                label="WebP Artifacts"
                description="Applies WebP-specific compression patterns"
                isActive={webpArtifacts}
                onChange={() => handleToggle("webp")}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-sm text-white/60">
          Powered by{" "}
          <span className="text-pink-500 border-b border-transparent hover:border-pink-500 transition-all duration-300">
            Click Tools
          </span>
          <span className="ml-2 text-white/40">v1.0</span>
        </p>
      </footer>
    </div>
  );
}
