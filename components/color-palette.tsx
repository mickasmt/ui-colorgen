"use client";

import { useState, useMemo } from "react";
import { Color, ColorData } from "@/types/colors";
import { tailwindColors, wrapperOptions } from "@/config/colors";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ColorPalette() {
  const [selectedColor, setSelectedColor] = useState("slate");
  const [wrapper, setWrapper] = useState("full");
  const [copiedValue, setCopiedValue] = useState("");

  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleCopyValue = (value: string) => {
    const wrappedValue = wrapValue(value);
    navigator.clipboard.writeText(wrappedValue);
    setCopiedValue(wrappedValue);
  };

  const selectedColorData = useMemo<ColorData[]>(() => {
    return tailwindColors[selectedColor].map((color: Color) => ({
      scale: color.scale.toString(),
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl,
    }));
  }, [selectedColor]);

  const twColors = Object.entries(tailwindColors).reduce(
    (acc, [colorName, colorData]) => {
      const hexValue = colorData.find((color) => color.scale === 500)?.hex;
      return { ...acc, [colorName]: hexValue };
    },
    {}
  );

  const wrapValue = (value: string) => {
    if (wrapper === "full") {
      return value;
    } else if (wrapper === "comma") {
      return value
        .replace(/rgb\((.*?)\)/g, (_, content) => content.replace(/,/g, ", "))
        .replace(/hsl\((.*?)\)/g, (_, content) => content.replace(/,/g, ", "));
    } else if (wrapper === "nothing") {
      return value
        .replace(/rgb\((.*?)\)/g, (_, content) => content.replace(/,/g, " "))
        .replace(/hsl\((.*?)\)/g, (_, content) => content.replace(/,/g, " "))
        .replace(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g, (_, content) => content);
    }
    return value;
  };

  return (
    <div className="w-full">
      <h1 className="capitalize font-semibold text-lg pb-2.5">Colors List</h1>

      {/* List all tailwind colors */}
      <div className="flex justify-center md:justify-start flex-wrap w-full gap-x-2.5 gap-y-2.5 pb-7">
        {Object.entries(twColors).map(([colorName, hexValue]) => {
          const backgroundColor =
            typeof hexValue === "string" ? hexValue : undefined;

          return (
            <div
              key={colorName}
              onClick={() => handleColorClick(colorName)}
              className="block w-16 cursor-pointer items-center gap-x-3 space-y-1"
            >
              <div
                className="h-8 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
                style={{
                  backgroundColor,
                }}
              ></div>
              <div className="px-0.5">
                <div className="w-full capitalize text-xs font-medium text-slate-900 dark:text-white">
                  {colorName}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pb-2">
        <h2 className="capitalize font-semibold text-lg">{selectedColor}</h2>

        <Select
          defaultValue={wrapper}
          onValueChange={(value: string) => setWrapper(value)}
        >
          <SelectTrigger className="w-[180px] h-9">
            <span className="text-slate-500">Wrapper: </span>
            <SelectValue placeholder="Select a wrapper" />
          </SelectTrigger>
          <SelectContent>
            {wrapperOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr />

      <Table className="text-sm">
        <TableCaption>
          {copiedValue ? `Copied value : ${copiedValue}` : "Click on a value to copy"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Level</TableHead>
            <TableHead>HEX</TableHead>
            <TableHead>RGB</TableHead>
            <TableHead>HSL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedColorData.map((color) => (
            <TableRow key={color.scale}>
              <TableCell className="hover:bg-white dark:hover:bg-slate-800">
                <div className="flex items-center w-full gap-1 md:gap-2 select-none">
                  <span className="text-xs md:text-sm min-w-[1.5625rem] block">
                    {color.scale}
                  </span>
                  <div
                    className="w-10 h-4 border border-gray-300 md:w-16 md:h-5"
                    style={{
                      backgroundColor: color.hex,
                    }}
                  ></div>
                </div>
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.hex.toUpperCase())}
              >
                {wrapValue(color.hex.toUpperCase())}
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.rgb)}
              >
                {wrapValue(color.rgb)}
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.hsl)}
              >
                {wrapValue(color.hsl)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
