"use client";

import useColors from "@/store/useColors";

import { formatOptions } from "@/config/colors";
import { generateCSSCode, generateTailwindCode } from "@/lib/colors";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TabCodeProps, TypeFormat } from "@/types/colors";
import TabsCodeViewer from "./tabs-code-viewer";

export default function CodePreview() {
  const variables = useColors((state) => state.variables);
  const format = useColors((state) => state.format);
  const updateFormat = useColors((state) => state.updateFormat);

  const handleSelectFormat = (value: TypeFormat) => {
    updateFormat(value);
  }

  const cssGenerated = generateCSSCode(variables, format);
  const twConfigGenerated = generateTailwindCode(variables, format);

  const tabData: TabCodeProps[] = [
    {
      tabValue: "account",
      label: "tailwind.config.js",
      code: twConfigGenerated,
      language: "javascript",
    },
    {
      tabValue: "password",
      label: "globals.css",
      code: cssGenerated,
      language: "css",
    },
  ];

  return (
    <div className="flex flex-col h-full lg:h-[820px] mt-3 w-full text-sm relative">
      {/* Select - Float top right */}
      <div className="z-20 absolute top-0 right-0">
        <Select
          defaultValue={format}
          onValueChange={(value: TypeFormat) => handleSelectFormat(value)}
        >
          <SelectTrigger className="w-[150px] h-9">
            <span className="text-slate-500">Format: </span>
            <SelectValue placeholder="Select a format" />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((option) => (
              <SelectItem key={option.name} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TabsCodeViewer data={tabData} />
    </div>
  );
}
