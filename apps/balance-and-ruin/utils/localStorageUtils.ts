/**
 * Retrieves a value from localStorage with type safety.
 * @param key - Storage key
 * @param defaultValue - Optional default if key missing or invalid
 * @returns Parsed value or default
 */
export function getLocal<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Stores a value in localStorage (serializes to JSON).
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful, false otherwise
 */
export function setLocal<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to store localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Removes a specific key from localStorage.
 * @param key - Storage key to remove
 */
export function removeLocal(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage key "${key}":`, error);
  }
}

/**
 * Clears all localStorage data for the origin.
 */
export function clearLocal(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

/**
 * Checks if a key exists in localStorage.
 * @param key - Storage key
 */
export function hasLocal(key: string): boolean {
  return localStorage.getItem(key) !== null;
}
