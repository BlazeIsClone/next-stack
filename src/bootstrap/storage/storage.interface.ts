export interface StorageInterface {
  put(
    fileName: string,
    buffer: ArrayBuffer
  ): Promise<{ status: boolean; response?: string; error?: string }>;

  getUrl(fileName: string): string;
}
