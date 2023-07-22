export interface Color {
  scale: number;
  hex: string;
  rgb: string;
  hsl: string;
}

export interface ColorData {
  scale: string;
  hex: string;
  rgb: string;
  hsl: string;
}

export interface TailwindColors {
  [key: string]: Color[];
}

export interface Variable {
  id: string;
  isNew: boolean;
  name: string;
  lightValue: string;
  darkValue: string;
}

export interface FormatOption {
  name: string;
  value: TypeFormat;
}

export enum TypeFormat {
  HSL = "hsl",
  RGB = "rgb",
  RGBA = "rgba",
}

export interface WrapperOption {
  label: string;
  value: string;
}

export interface RgbColorPicker {
  r: number;
  g: number;
  b: number;
}

export interface HslColorPicker {
  h: number;
  s: number;
  l: number;
}

export interface TabCodeProps {
  tabValue: string;
  label: string;
  language: string;
  copyCode?: string;
  displayCode: string;
}
