import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  // Use clsx to handle conditional classes and then merge them
  return mergeClasses(clsx(inputs))
}
// Custom function to deduplicate and merge class names
function mergeClasses(classes: string): string {
  // Split classes into array and filter out duplicates
  const uniqueClasses = Array.from(new Set(classes.split(' ')))
  // Remove empty strings and falsy values
  return uniqueClasses.filter(Boolean).join(' ')
}