import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

type ImageMetadata = {
  id: string;
  fileName: string;
  fileExtension: string;
  uploadDate: Date;
  creator?: string;
  title?: string;
  url?: string;
};

type Result<T> = [Error | null, T | null];

export class ImageManager {
  private storage;
  private db;
  private cache: Map<string, ImageMetadata>;

  constructor(firebaseApp: any) {
    this.storage = getStorage(firebaseApp);
    this.db = getFirestore(firebaseApp);
    this.cache = new Map();
  }

  private validateFile(file: File): Error | null {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      return new Error(
        `Formato de archivo no válido. Formatos permitidos: ${ALLOWED_EXTENSIONS.join(", ")}`,
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return new Error("El archivo excede el tamaño máximo permitido de 5MB");
    }

    return null;
  }

  async getAllImages(): Promise<Result<ImageMetadata[]>> {
    try {
      const imagesCollection = collection(this.db, "images");
      const querySnapshot = await getDocs(query(imagesCollection));

      const images: ImageMetadata[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data() as ImageMetadata;
          if (!data.url) {
            const storageRef = ref(
              this.storage,
              `images/${data.id}.${data.fileExtension}`,
            );
            data.url = await getDownloadURL(storageRef);
          }
          return data;
        }),
      );

      return [null, images];
    } catch (error) {
      return [error as Error, null];
    }
  }

  async uploadImage(
    file: File,
    creator?: string,
    title?: string,
  ): Promise<Result<ImageMetadata>> {
    try {
      const validationError = this.validateFile(file);
      if (validationError) {
        return [validationError, null];
      }

      const id = uuidv4();
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      const fileName = `${id}.${extension}`;
      const storageRef = ref(this.storage, `images/${fileName}`);

      // Subir imagen
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Crear metadata
      const metadata: ImageMetadata = {
        id,
        fileName,
        fileExtension: extension,
        uploadDate: new Date(),
        creator,
        title,
        url,
      };

      // Guardar en Firestore
      await addDoc(collection(this.db, "images"), metadata);

      // Guardar en caché
      this.cache.set(id, metadata);

      return [null, metadata];
    } catch (error) {
      return [error as Error, null];
    }
  }

  async getImage(id: string): Promise<Result<ImageMetadata>> {
    try {
      // Verificar caché
      if (this.cache.has(id)) {
        return [null, this.cache.get(id)!];
      }

      // Buscar en Firestore
      const imagesRef = collection(this.db, "images");
      const querySnapshot = await getDocs(query(imagesRef));
      const docData = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return data.id === id;
      });

      if (!docData) {
        return [new Error("Imagen no encontrada"), null];
      }

      const imageData = docData.data() as ImageMetadata;

      // Obtener URL si no está en los datos
      if (!imageData.url) {
        const storageRef = ref(
          this.storage,
          `images/${imageData.id}.${imageData.fileExtension}`,
        );
        imageData.url = await getDownloadURL(storageRef);
      }

      // Guardar en caché
      this.cache.set(id, imageData);

      return [null, imageData];
    } catch (error) {
      return [error as Error, null];
    }
  }
}
