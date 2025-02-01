import { CacheConfig } from "./types";

export class Cache<T> {
  private items: Map<string, { value: T; timestamp: number }>;
  private config: Required<CacheConfig>;

  constructor(config: CacheConfig) {
    this.items = new Map();
    this.config = {
      enabled: config.enabled,
      maxSize: config.maxSize || 100,
      ttl: config.ttl || 24 * 60 * 60 * 1000, // 24 horas por defecto
    };
  }

  set(key: string, value: T): void {
    if (!this.config.enabled) return;

    // Si alcanzamos el tamaño máximo, eliminamos el elemento más antiguo
    if (this.items.size >= this.config.maxSize) {
      const oldest = Array.from(this.items.entries()).sort(
        ([, a], [, b]) => a.timestamp - b.timestamp,
      )[0];
      if (oldest) {
        this.items.delete(oldest[0]);
      }
    }

    this.items.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    if (!this.config.enabled) return null;

    const item = this.items.get(key);
    if (!item) return null;

    // Comprobar si el elemento ha expirado
    if (Date.now() - item.timestamp > this.config.ttl) {
      this.items.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: string): boolean {
    if (!this.config.enabled) return false;
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.items.delete(key);
  }

  clear(): void {
    this.items.clear();
  }

  getSize(): number {
    return this.items.size;
  }

  getStats(): {
    size: number;
    maxSize: number;
    enabled: boolean;
    ttl: number;
  } {
    return {
      size: this.items.size,
      maxSize: this.config.maxSize,
      enabled: this.config.enabled,
      ttl: this.config.ttl,
    };
  }
}

// Factory function para crear instancias de Cache
export const createCache = <T>(config: CacheConfig): Cache<T> => {
  return new Cache<T>(config);
};
