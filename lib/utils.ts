import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMarkdownBold(text: string): string[] {
  return text.split(/(\*\*.*?\*\*)/).filter(Boolean);
}

