import React, { useState, useCallback, useRef } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import type { ImageItem } from "../App";

interface ImageUploadProps {
  onUpload: (image: ImageItem) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [pseudonym, setPseudonym] = useState("");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (preview) {
        onUpload({
          id: Date.now().toString(),
          url: preview,
          pseudonym: pseudonym || "Anònim",
          title: title || undefined,
        });
        setPreview(null);
        setPseudonym("");
        setTitle("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [preview, pseudonym, title, onUpload],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload" className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Penja aquí el teu text d'opinió
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive
                ? "border-[#193547] bg-[#193547]/5"
                : "border-gray-300 hover:border-[#193547]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <p className="text-gray-600">
                  Arrossega la teva foto aquí o{" "}
                  <span className="text-[#193547] font-semibold">
                    fes click per sel·leccionar
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="pseudonym"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Qui ha escrit aquest text? Fes servir un pseudònim
                <span className="ml-2 text-gray-400 text-xs">(opcional)</span>
              </label>
              <input
                type="text"
                id="pseudonym"
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#193547] focus:border-transparent"
                placeholder="Ex: Escriptor123"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Posa un títol al teu text
                <span className="ml-2 text-gray-400 text-xs">(opcional)</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#193547] focus:border-transparent"
                placeholder="Ex: La meva opinió sobre..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!preview}
            className="w-full py-3 bg-[#193547] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Penjar text
          </button>
        </form>
      </div>
    </section>
  );
};

export default ImageUpload;

