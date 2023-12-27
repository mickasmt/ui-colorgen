"use client";

import { useState } from "react";
import convert from "color-convert";
import { SketchPicker } from "react-color";

import useColors from "@/store/useColors";
import { Variable } from "@/types/colors";
import { convertObjectToHSLString, convertStringToArrayHsl } from "@/lib/colors";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
  id: string;
  field: keyof Variable;
  colorHsl: string;
}

export default function InputColorPicker({ id, field, colorHsl }: IProps) {
  const formattedColorHsl = convertStringToArrayHsl(colorHsl);
  // @ts-ignore
  const convertColorHex = `#${convert.hsl.hex(formattedColorHsl)}`;

  // console.log(formattedColorHsl);
  // console.log(convertColorHex);

  const [colorPicker, setColorPicker] = useState(convertColorHex);
  const updateVariable = useColors((state) => state.updateVariable);

  const handleChange = (color: string) => {
    setColorPicker(color);
  };

  const handleChangeComplete = (color: string) => {
    updateVariable(id, color, field);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center text-xs">
            <div
              style={{ backgroundColor: colorPicker }}
              className="w-12 h-4 border border-gray-300 dark:border-gray-600 mr-2"
            />
            <input
              id={`${field}-${id}`}
              readOnly
              type="text"
              value={colorPicker ? colorPicker : "#ffffff"}
              className="w-full outline-none uppercase cursor-pointer bg-transparent"
              // only hex = uppercase
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          <SketchPicker
            color={colorPicker}
            onChange={(updatedColor) => handleChange(updatedColor.hex)}
            onChangeComplete={(updatedColor) =>
              handleChangeComplete(convertObjectToHSLString(updatedColor.hsl))
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}