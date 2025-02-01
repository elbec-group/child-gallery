import { FirebaseApp } from "firebase/app";

export interface ImageMetadata {
  id: string;
  fileName: string;
  fileExtension: string;
  uploadDate: Date;
  creator?: string;
  title?: string;
  url?: string;
}

export type Result<T> = [Error | null, T | null];

export interface IImageManager {
  getAllImages(): Promise<Result<ImageMetadata[]>>;
  uploadImage(
    file: File,
    creator?: string,
    title?: string,
  ): Promise<Result<ImageMetadata>>;
  getImage(id: string): Promise<Result<ImageMetadata>>;
}

export interface ImageManagerConfig {
  maxFileSize?: number; // en bytes
  allowedExtensions?: string[];
  storagePath?: string;
  collectionName?: string;
}

export interface CacheConfig {
  enabled: boolean;
  maxSize?: number; // Número máximo de elementos en caché
  ttl?: number; // Tiempo de vida en ms
}
