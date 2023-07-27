import { generateVariablesFromColor } from "@/lib/colors";
import { tailwindColors } from "@/registry/colors";
import {
  Variable,
  FormatOption,
  TypeFormat,
} from "@/types/colors";

// default values in docs shadcn/ui
// export const defaultVariables: Variable[] = [
//   {
//     id: "89280818-39a5-4a74-a231-b7cdb3597d15",
//     isNew: false,
//     name: "border",
//     lightValue: "214.3 31.8% 91.4%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "be06a143-b7b4-4943-bfb3-560e296f990f",
//     isNew: false,
//     name: "input",
//     lightValue: "214.3 31.8% 91.4%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "0ab28dc4-858a-40f9-ab24-c5d39b0f9407",
//     isNew: false,
//     name: "ring",
//     lightValue: "215 20.2% 65.1%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "d73ad9a3-2606-4e9a-8fe9-fec5eb176a82",
//     isNew: false,
//     name: "background",
//     lightValue: "0 0% 100%",
//     darkValue: "222.2 84% 4.9%",
//   },
//   {
//     id: "b424387d-8e8f-4758-9763-061d90a700de",
//     isNew: false,
//     name: "foreground",
//     lightValue: "222.2 84% 4.9%",
//     darkValue: "210 40% 98%",
//   },
//   {
//     id: "38c47b7d-78a5-45f0-aeb3-fa63dbb1f070",
//     isNew: false,
//     name: "muted",
//     lightValue: "210 40% 96.1%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "2c0c3335-80e1-4147-b187-cf30fc875223",
//     isNew: false,
//     name: "muted-foreground",
//     lightValue: "215.4 16.3% 46.9%",
//     darkValue: "215 20.2% 65.1%",
//   },
//   {
//     id: "f3bbe480-d87c-4c02-9ab0-3ccb74a812cc",
//     isNew: false,
//     name: "popover",
//     lightValue: "0 0% 100%",
//     darkValue: "222.2 84% 4.9%",
//   },
//   {
//     id: "ac851b38-4cc0-4022-b90d-9bf4a1241f5a",
//     isNew: false,
//     name: "popover-foreground",
//     lightValue: "222.2 84% 4.9%",
//     darkValue: "210 40% 98%",
//   },

//   {
//     id: "cea186b2-7d18-4f81-b03e-2c04999ff528",
//     isNew: false,
//     name: "card",
//     lightValue: "0 0% 100%",
//     darkValue: "222.2 84% 4.9%",
//   },
//   {
//     id: "27781eb7-5f72-4ce1-be53-2a2d78457f72",
//     isNew: false,
//     name: "card-foreground",
//     lightValue: "222.2 84% 4.9%",
//     darkValue: "210 40% 98%",
//   },
//   {
//     id: "6d351201-08e6-45e6-9cc6-16f9f2afa4ba",
//     isNew: false,
//     name: "primary",
//     lightValue: "160 90% 46%",
//     darkValue: "210 40% 98%",
//   },
//   {
//     id: "932d7c49-09b3-42c9-a8b1-15709d9ba145",
//     isNew: false,
//     name: "primary-foreground",
//     lightValue: "210 40% 98%",
//     darkValue: "222.2 47.4% 11.2%",
//   },
//   {
//     id: "fed9016a-4b85-42e1-9ba1-226e58c0c0c1",
//     isNew: false,
//     name: "secondary",
//     lightValue: "210 40% 96.1%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "d7aabb55-8c0c-4ead-9f7e-cb7989d45ad7",
//     isNew: false,
//     name: "secondary-foreground",
//     lightValue: "222.2 47.4% 11.2%",
//     darkValue: "210 40% 98%",
//   },
//   {
//     id: "d8136275-7a5c-41de-bc64-4620f1dec99c",
//     isNew: false,
//     name: "accent",
//     lightValue: "210 40% 96.1%",
//     darkValue: "217.2 32.6% 17.5%",
//   },
//   {
//     id: "a6e8217b-4d52-4e0d-a138-da5a11af1392",
//     isNew: false,
//     name: "accent-foreground",
//     lightValue: "222.2 47.4% 11.2%",
//     darkValue: "210 40% 98%",
//   },
//   {
//     id: "09162196-ea46-4c5e-8cac-037d0769d052",
//     isNew: false,
//     name: "destructive",
//     lightValue: "0 84.2% 60.2%",
//     darkValue: "0 62.8% 30.6%",
//   },
//   {
//     id: "bf3bbf21-e41f-4a6c-b01d-c8d78b91fd2b",
//     isNew: false,
//     name: "destructive-foreground",
//     lightValue: "210 40% 98%",
//     darkValue: "0 85.7% 97.3%",
//   },
// ];

export const defaultVariables: Variable[] = generateVariablesFromColor();

export const twColors = Object.keys(tailwindColors).filter((key) => key !== "others");

export const formatOptions: FormatOption[] = [
  { label: "HSL", value: TypeFormat.HSL },
  { label: "RGB", value: TypeFormat.RGB },
  { label: "RGBA", value: TypeFormat.RGBA },
];

export const wrapperOptions: FormatOption[] = [
  { label: "Full", value: "full" },
  { label: "Comma", value: "comma" },
  { label: "Nothing", value: "nothing" },
];