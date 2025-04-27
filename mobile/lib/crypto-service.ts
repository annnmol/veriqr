import * as Crypto from "expo-crypto";

class CryptoService {
  /**
   * Generate cryptographically secure random bytes.
   * @param length - Number of random bytes to generate.
   * @returns A promise that resolves to a hexadecimal string representation of the random bytes.
   */
  static async generateRandomBytes(length: number): Promise<string> {
    try {
      const randomBytes = await Crypto.getRandomBytesAsync(length);
      return Array.from(randomBytes)
        .map((byte: number) => byte.toString(16).padStart(2, "0"))
        .join("");
    } catch (error) {
      console.error("Error generating random bytes:", error);
      throw error;
    }
  }

  /**
   * Hash a string using the specified algorithm.
   * @param input - The string to hash.
   * @param algorithm - The hash algorithm to use (e.g., SHA-1, SHA-256, SHA-512).
   * @returns A promise that resolves to the hashed string.
   */
  static async hashString(
    input: string,
    algorithm: Crypto.CryptoDigestAlgorithm = Crypto.CryptoDigestAlgorithm
      .SHA256
  ): Promise<string> {
    try {
      return await Crypto.digestStringAsync(algorithm, input);
    } catch (error) {
      console.error("Error hashing string:", error);
      throw error;
    }
  }

  /**
   * Hash an array of numbers using the specified algorithm.
   * @param data - The array of numbers to hash (e.g., [1, 2, 3, 4, 5]).
   * @param algorithm - The hash algorithm to use (e.g., SHA-1, SHA-256, SHA-512).
   * @returns A promise that resolves to an ArrayBuffer representing the hash.
   */
  static async hashData(
    data: number[],
    algorithm: Crypto.CryptoDigestAlgorithm = Crypto.CryptoDigestAlgorithm
      .SHA512
  ): Promise<ArrayBuffer> {
    try {
      const uint8Array = new Uint8Array(data);
      return await Crypto.digest(algorithm, uint8Array);
    } catch (error) {
      console.error("Error hashing data:", error);
      throw error;
    }
  }

  /**
   * Generate a cryptographically secure random UUID.
   * @returns A promise that resolves to a randomly generated UUID.
   */
  static async generateUUID(): Promise<string> {
    try {
      return await Crypto.randomUUID();
    } catch (error) {
      console.error("Error generating UUID:", error);
      throw error;
    }
  }
}

export default CryptoService;
