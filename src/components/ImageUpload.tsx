import React, { useState, useCallback, useRef } from "react";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import type { ImageItem } from "../App";
import { ImageManager } from "../lib/firebase/ImageManager";
import NSFWValidator from "../lib/nsfw/NSFWValidator";

interface ImageUploadProps {
  onUpload: (image: ImageItem) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [pseudonym, setPseudonym] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateAndProcessFile = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setIsValidating(true);
      setError(null);

      try {
        // Validar con NSFW.js
        const validator = NSFWValidator.getInstance();
        const validationResult = await validator.validateImage(file);

        if (!validationResult.isValid) {
          setError(validationResult.message || "Error de validació");
          setPreview(null);
          setSelectedFile(null);
          return;
        }

        // Si pasa la validación, mostrar preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setSelectedFile(file);
        setError(null);
      } catch (error) {
        setError("Error al validar la imatge");
        setPreview(null);
        setSelectedFile(null);
      } finally {
        setIsValidating(false);
      }
    } else {
      setError("Si us plau, selecciona un arxiu d'imatge vàlid");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        validateAndProcessFile(file);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFile || !preview) return;

      setIsUploading(true);
      setError(null);

      try {
        const imageManager = new ImageManager(window.app);
        const [error, metadata] = await imageManager.uploadImage(
          selectedFile,
          pseudonym || "Anònim",
          title,
        );

        if (error) throw error;
        if (!metadata)
          throw new Error("No s'ha pogut obtenir la metadata de la imatge");

        const newImage: ImageItem = {
          id: metadata.id,
          url: metadata.url || preview,
          pseudonym: metadata.creator || "Anònim",
          title: metadata.title,
        };

        onUpload(newImage);

        // Limpiar el formulario
        setPreview(null);
        setPseudonym("");
        setTitle("");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al pujar la imatge",
        );
      } finally {
        setIsUploading(false);
      }
    },
    [preview, pseudonym, title, selectedFile, onUpload],
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
              disabled={isUploading || isValidating}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="space-y-4">
                {isValidating ? (
                  <>
                    <Loader2 className="h-12 w-12 mx-auto text-gray-400 animate-spin" />
                    <p className="text-gray-600">Validant imatge...</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-gray-600">
                      Arrossega la teva foto aquí o{" "}
                      <span className="text-[#193547] font-semibold">
                        fes click per sel·leccionar
                      </span>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

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
                disabled={isUploading}
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
                disabled={isUploading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!preview || isUploading || isValidating}
            className="w-full py-3 bg-[#193547] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Penjant text...
              </>
            ) : isValidating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Validant...
              </>
            ) : (
              "Penjar text"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ImageUpload;
