import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names intelligently using clsx + tailwind-merge.
 * Handles conditional classes, arrays, and deduplication of conflicting Tailwind classes.
 *
 * @param {...(string|undefined|null|boolean|Object|Array)} inputs - Class values
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
