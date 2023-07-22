import convert from "color-convert";
import {
  HslColorPicker,
  RgbColorPicker,
  TypeFormat,
  Variable,
} from "@/types/colors";

// RGB Part
export function convertObjectToRGBString(obj: RgbColorPicker) {
  return Object.values(obj).join(", ");
}

// HSL Part
export function convertStringToArrayHsl(hslString: string) {
  const hslValues = hslString
    .split(" ")
    .map((value) => parseFloat(value.replace("%", "")));

  return hslValues; // output : [222.2, 84, 4.9]
}

export function convertHSLStringToObject(hslString: string) {
  const [hue, saturation, lightness] = convertStringToArrayHsl(hslString);

  const h = hue;
  const s = saturation / 100;
  const l = lightness / 100;

  return { h, s, l };
}

export function convertObjectToHSLString(obj: HslColorPicker): string {
  const hue = Number(obj.h.toFixed(1)).toString();
  const saturation = Number((obj.s * 100).toFixed(1)).toString();
  const lightness = Number((obj.l * 100).toFixed(1)).toString();

  return `${hue} ${saturation}% ${lightness}%`;
}

export function convertHslToRgb(hslValue: string): number[] {
  const hslArray = convertStringToArrayHsl(hslValue);
  //@ts-ignore
  const convertedValue = convert.hsl.rgb(hslArray);
  return convertedValue;
}

// Code Preview Part
export function displayCssByFormat(value: string, format: TypeFormat): string {
  if (format === "hsl") {
    return value;
  }

  const rgbArray = convertHslToRgb(value);

  switch (format) {
    case "rgb":
      return rgbArray.join(" ");
    case "rgba":
      return rgbArray.join(", ");
    default:
      return value;
  }
}

export function generateCSSCode(data: Variable[], format: TypeFormat): string {
  const groupedVariables: { [group: string]: Variable[] } = {};

  // Group variables by their prefixes
  for (const variable of data) {
    const nameParts = variable.name.split("-");
    const groupName = nameParts[0];

    if (!groupedVariables[groupName]) {
      groupedVariables[groupName] = [];
    }

    groupedVariables[groupName].push(variable);
  }

  // Sort variables within each group
  for (const group in groupedVariables) {
    groupedVariables[group].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Generate CSS variables code
  let cssCode = ":root {\n";
  let lastGroup = "";
  for (const group in groupedVariables) {
    const variables = groupedVariables[group];

    if (group !== "foreground" && group !== "input") {
      if (lastGroup !== "") {
        cssCode += `\n`;
      }
    }

    for (const variable of variables) {
      cssCode += `    --${variable.name}: ${displayCssByFormat(
        variable.lightValue,
        format
      )};\n`;
    }

    lastGroup = group;
  }
  cssCode += `}\n\n`;

  cssCode += `.dark {\n`;
  lastGroup = "";
  for (const group in groupedVariables) {
    const variables = groupedVariables[group];

    if (group !== "foreground" && group !== "input") {
      if (lastGroup !== "") {
        cssCode += `\n`;
      }
    }

    for (const variable of variables) {
      cssCode += `    --${variable.name}: ${displayCssByFormat(
        variable.darkValue,
        format
      )};\n`;
    }

    lastGroup = group;
  }
  cssCode += `}`;

  return cssCode;
}

export function generateTailwindCode(
  variables: Variable[],
  format: string
): {display: string, copy: string} {
  const colorProperties: {
    [colorName: string]: { [propertyName: string]: string };
  } = {};
  const singleLineVariables = new Set<string>([
    "border",
    "input",
    "ring",
    "background",
    "foreground",
  ]);

  for (const variable of variables) {
    const [colorName, propertyName = "DEFAULT"] = variable.name.split("-");
    const colorProperty = colorProperties[colorName] || {};

    if (singleLineVariables.has(colorName)) {
      //@ts-ignore
      colorProperties[colorName] = `${format}(var(--${variable.name}))`;
    } else {
      colorProperty[propertyName] = `${format}(var(--${variable.name}))`;
      colorProperties[colorName] = colorProperty;
    }
  }

  const colorCode = Object.entries(colorProperties)
    .map(([colorName, properties]) => {
      if (typeof properties === "string") {
        return `  ${colorName}: "${properties}",`;
      }

      const colorPropertiesCode = Object.entries(properties)
        .map(
          ([propertyName, propertyValue]) =>
            `  ${propertyName}: "${propertyValue}",`
        )
        .join(`\n        `);

      return `  ${colorName}: {
        ${colorPropertiesCode}
        },`;
    })
    .join(`\n      `);

  const twCodeJS = `/** @type {import('tailwindcss').Config} */
module.exports = {
  ...,
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
      ${colorCode}
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      ...,
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

  return { display: twCodeJS, copy: colorCode };
}
