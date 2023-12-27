import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// import { wrapperOptions } from "@/config/colors";
// import { twColors } from "@/config/colors";

type Palette = {
  wrapper: string
  color: string
}

const paletteAtom = atomWithStorage<Palette>("palette", {
  wrapper: "full",
  color: "slate",
})

export function usePalette() {
  return useAtom(paletteAtom)
}