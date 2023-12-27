"use client";

import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tailwindColors } from "@/registry/colors";
import { wrapValue } from "@/lib/colors";
import { usePalette } from '@/hooks/use-palette';

export const ColorTable = () => {
  const [palette] = usePalette();
  const [copiedValue, setCopiedValue] = useState<string>("");

  const selectedColorData = useMemo(() => {
    return tailwindColors[palette.color].map((color) => ({
      scale: color.scale.toString(),
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl,
    }));
  }, [palette.color]);

  const handleCopyValue = (value: string) => {
    const wrappedValue = wrapValue(value, palette.wrapper);
    navigator.clipboard.writeText(wrappedValue);
    setCopiedValue(wrappedValue);
  };

  return (
    <div className="flex flex-col items-start justify-between">
      <Table className="text-sm md:text-[15px] w-full min-w-[525px]">
        <TableCaption className="text-sm md:text-base pt-1 pb-4">
          {copiedValue ? `Copied value : ${copiedValue}` : "Click on a value to copy"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] md:w-[150px]">Level</TableHead>
            <TableHead>HEX</TableHead>
            <TableHead>RGB</TableHead>
            <TableHead>HSL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedColorData.map((color) => (
            <TableRow key={color.scale}>
              <TableCell className='pointer-events-none'>
                <div className="flex items-center w-full gap-2 select-none">
                  <div
                    className="w-10 h-5 rounded-xl border border-gray-300 dark:border-gray-600 md:w-12"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="text-sm min-w-[1.5625rem] block">
                    {color.scale}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.hex.toUpperCase())}
              >
                {wrapValue(color.hex.toUpperCase(), palette.wrapper)}
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.rgb)}
              >
                {wrapValue(color.rgb, palette.wrapper)}
              </TableCell>
              <TableCell
                className="cursor-pointer select-none"
                onClick={() => handleCopyValue(color.hsl)}
              >
                {wrapValue(color.hsl, palette.wrapper)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};