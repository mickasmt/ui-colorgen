import convert from "color-convert";
import { v4 as uuidv4 } from "uuid";
import {
  Color,
  HslColorPicker,
  RgbColorPicker,
  TypeFormat,
  Variable,
} from "@/types/colors";
import { colorMapping, tailwindColors } from "@/registry/colors";

// ===================== Variables Part =====================
export const wrapValue = (value: string, wrapper: string) => {
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

export const getHSLFromTailwindColors = (color: string): string => {
  const [colorKey, scaleStr] = color.toLowerCase().split("-");
  const scale = Number(scaleStr);

  const colorDataArray: Color[] = tailwindColors[colorKey];

  if (colorDataArray) {
    if (!isNaN(scale)) {
      const colorData = colorDataArray.find((data) => data.scale === scale);
      if (colorData && colorData.hsl) {
        return wrapValue(colorData.hsl, "nothing");
      }
    } 
  } else if ((colorKey === "white" || colorKey === "black") && tailwindColors.others) {
    const othersScale = colorKey === "white" ? 0 : 500;
    return wrapValue(tailwindColors.others[othersScale].hsl, "nothing");
  }

  return "0 0% 100%";
};

export const generateVariablesFromColor = (selectedColor: string = "slate"): Variable[] => {
  const colorVariables: Variable[] = [];

  const mapping = colorMapping(selectedColor);
  Object.keys(mapping).forEach((name) => {
    const lightValue = getHSLFromTailwindColors(mapping[name as keyof typeof mapping].light);
    const darkValue = getHSLFromTailwindColors(mapping[name as keyof typeof mapping].dark);

    const variable: Variable = {
      id: uuidv4(),
      isNew: false,
      name,
      lightValue,
      darkValue,
    };

    colorVariables.push(variable);
  });

  return colorVariables;
};

export const updateVariablesFromColor = (selectedColor: string, currentVariables: Variable[]): Variable[] => {
  const customVariables = currentVariables.filter((variable) => variable.isNew === true);
  const newDefaultVariables = generateVariablesFromColor(selectedColor);

  return [...newDefaultVariables, ...customVariables];
}



// ===================== RGB Part =====================
export function convertObjectToRGBString(obj: RgbColorPicker) {
  return Object.values(obj).join(", ");
}


// ===================== HSL Part =====================
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

  const twCodeJS = `module.exports = {
  ...,
  theme: {
    extend: {
      colors: {
      ${colorCode}
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

  return { display: twCodeJS, copy: colorCode };
}
