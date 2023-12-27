import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { tailwindColors } from "@/registry/colors";

// import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getColorScaleValue(colorName: string, scale: number) {
  if (tailwindColors[colorName]) {
    const colorScale = tailwindColors[colorName].find(c => c.scale === scale);
    if (colorScale) {
      return colorScale.hex;
    } else {
      return `Scale ${scale} not found for color ${colorName}`;
    }
  } else {
    return `Color ${colorName} not found`;
  }
}