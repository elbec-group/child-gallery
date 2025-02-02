import * as nsfwjs from "nsfwjs";

export interface NSFWPrediction {
  className: string;
  probability: number;
}

export class NSFWValidator {
  private static instance: NSFWValidator;
  private model: nsfwjs.NSFWJS | null = null;
  private modelLoadPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): NSFWValidator {
    if (!NSFWValidator.instance) {
      NSFWValidator.instance = new NSFWValidator();
    }
    return NSFWValidator.instance;
  }

  private async loadModel(): Promise<void> {
    if (!this.model && !this.modelLoadPromise) {
      this.modelLoadPromise = nsfwjs
        .load("MobileNetV2Mid")
        .then((loadedModel) => {
          this.model = loadedModel;
        });
    }
    if (this.modelLoadPromise) {
      await this.modelLoadPromise;
    }
  }

  public async validateImage(
    file: File,
  ): Promise<{ isValid: boolean; message?: string }> {
    try {
      await this.loadModel();
      if (!this.model) {
        throw new Error("No s'ha pogut carregar el model NSFW");
      }

      // Crear una URL para la imagen
      const imageUrl = URL.createObjectURL(file);

      // Crear un elemento de imagen para clasificar
      const img = new Image();
      img.crossOrigin = "anonymous";

      // Cargar la imagen y clasificarla
      const imageLoadPromise = new Promise<nsfwjs.predictionType[]>(
        (resolve, reject) => {
          img.onload = async () => {
            try {
              const predictions = await this.model!.classify(img);
              resolve(predictions);
            } catch (error) {
              reject(error);
            } finally {
              URL.revokeObjectURL(imageUrl);
            }
          };
          img.onerror = () => {
            URL.revokeObjectURL(imageUrl);
            reject(new Error("Error al carregar la imatge"));
          };
        },
      );

      img.src = imageUrl;
      const predictions = await imageLoadPromise;
      console.log(predictions.find((p) => p.className === "Neutral"));

      // Comprobar predicciones
      let inappropriateContent = false;
      let highestInappropriateProbability = 0;
      let inappropriateCategory = "";

      predictions.forEach((prediction) => {
        if (
          ["Porn", "Hentai", "Sexy"].includes(prediction.className) &&
          prediction.probability > 0.5
        ) {
          inappropriateContent = true;
          if (prediction.probability > highestInappropriateProbability) {
            highestInappropriateProbability = prediction.probability;
            inappropriateCategory = prediction.className;
          }
        }
      });

      if (
        predictions.find((p) => p.className === "Neutral")?.probability < 0.5
      ) {
        return {
          isValid: false,
          message:
            "Aquesta imatge no es pot pujar perquè pot contenir contingut inadequat. Si us plau, selecciona una altra imatge.",
        };
      }

      if (inappropriateContent) {
        return {
          isValid: false,
          message:
            "Aquesta imatge no es pot pujar perquè pot contenir contingut inadequat. Si us plau, selecciona una altra imatge.",
        };
      }

      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        message:
          error instanceof Error ? error.message : "Error al validar la imatge",
      };
    }
  }
}

export default NSFWValidator;
