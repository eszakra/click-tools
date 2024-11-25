import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  image: string | null;
  className?: string;
}

export default function ImageUploader({ onImageUpload, image, className = '' }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-lg border-2 border-dashed border-white/10 
        cursor-pointer transition-all duration-300
        ${isDragActive ? 'border-pink-500 bg-pink-500/10' : 'hover:border-white/20 hover:bg-white/5'}
        ${image ? 'bg-black/40' : 'bg-black/20'}
        ${className}
      `}
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={image}
          alt="Preview"
          className="max-h-full max-w-full object-contain rounded"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Upload className="w-12 h-12 text-pink-500 mb-4" />
          <p className="text-white/60 mb-2">
            Drag and drop an image or click to upload
          </p>
          <p className="text-white/40 text-sm">
            Supported formats: JPEG, WebP
          </p>
        </div>
      )}
    </div>
  );
}