export type ClassValue = string | number | boolean | undefined | null;

/**
 * Utility to combine class names cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}

export default cn;
