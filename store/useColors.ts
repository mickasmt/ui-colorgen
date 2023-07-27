import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { devtools } from "zustand/middleware";

import { TwColorsKeys, TypeFormat, Variable } from "@/types/colors";
import { defaultVariables } from "@/config/colors";
import { updateVariablesFromColor } from "@/lib/colors";

interface ColorState {
  initialColor: TwColorsKeys;
  updateInitialColor: (color: TwColorsKeys) => void;
  format: TypeFormat;
  updateFormat: (type: TypeFormat) => void;
  variables: Variable[];
  addVariable: () => void;
  updateVariable: (id: string, value: string, field: keyof Variable) => void;
  deleteVariable: (id: string) => void;
}

const useColors = create<ColorState>()(
  devtools(
    (set) => ({
      // Initial color section
      initialColor: "slate",
      updateInitialColor: (color) =>
        set((state) => ({
          initialColor: color,
          variables: updateVariablesFromColor(color, state.variables)
        })),

      // Format section
      format: TypeFormat.HSL,
      updateFormat: (type) =>
        set(() => ({
          format: type,
        })),

      // Variables section
      variables: defaultVariables,
      addVariable: () =>
        set((state) => ({
          variables: [
            ...state.variables,
            {
              id: uuidv4(),
              name: "",
              lightValue: "",
              darkValue: "",
              isNew: true,
            },
          ],
        })),
      updateVariable: (id, value, field) =>
        set((state) => ({
          variables: state.variables.map((variable) =>
            variable.id === id ? { ...variable, [field]: value } : variable
          ),
        })),
      deleteVariable: (id) =>
        set((state) => ({
          variables: state.variables.filter((v) => v.id !== id),
        })),
    }),
    { enabled: true }
  )
);

export default useColors;
