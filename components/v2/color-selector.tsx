"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { wrapperOptions } from "@/config/colors";
import { useMounted } from "@/hooks/use-mounted";
import { usePalette } from "@/hooks/use-palette";
import { cn, getColorScaleValue } from "@/lib/utils";
import { tailwindColors } from "@/registry/colors";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const ColorSelector = () => {
  const mounted = useMounted();
  const [palette] = usePalette();

  return (
    <>
      <div className="flex xl:hidden pb-3">
        {mounted ? (
          <Drawer>
            <div className="flex w-full justify-between">
              <DrawerTrigger asChild>
                <Button
                  variant={"outline"}
                  size="sm"
                  className={cn("justify-center px-5 capitalize min-w-28 text-[15px]")}
                  style={
                    {
                      "--theme-primary": getColorScaleValue(palette.color, 500),
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "flex h-5 w-10 md:w-12 border shrink-0 -translate-x-1.5 items-center justify-center rounded-full bg-[--theme-primary]"
                    )}
                  ></span>
                  {palette.color}
                </Button>
              </DrawerTrigger>
              <DrawerTrigger>
                <Button variant={"outline"} size="sm" className="px-5 text-[15px]">
                  Wrapper :&nbsp;
                  <span className="capitalize">{" " + palette.wrapper}</span>
                </Button>
              </DrawerTrigger>
            </div>
            <DrawerContent className="rounded-t-3xl">
              <div className="p-5 pb-8">
                <Customizer />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="flex w-full justify-between">
            <Skeleton className="h-9 w-28 border rounded-2xl" />
            <Skeleton className="h-9 w-28 border rounded-2xl" />
          </div>
        )}
      </div>
      <div className="hidden xl:block border p-4 rounded-2xl">
        <Customizer />
      </div>
    </>
  );
};

function Customizer() {
  const mounted = useMounted();
  const [palette, setPalette] = usePalette();

  const twColors = Object.entries(tailwindColors).reduce(
    (acc, [colorName, colorData]) => {
      const hexValue = colorData.find((color) => color.scale === 500)?.hex;
      return { ...acc, [colorName]: hexValue };
    },
    {}
  );

  return (
    <div className="w-full">
      <h2 className="capitalize font-semibold text-base pb-2.5">Wrapper</h2>
      <div className="grid grid-cols-3 gap-2">
        {wrapperOptions.map((w) => {
          return mounted ? (
            <Button
              variant={"outline"}
              size="sm"
              key={w.label}
              onClick={() => {
                setPalette({
                  ...palette,
                  wrapper: w.value,
                });
              }}
              className={cn(
                palette.wrapper === w.value &&
                  "border-2 border-primary dark:bg-slate-800 dark:border-primary"
              )}
            >
              {w.label}
            </Button>
          ) : (
            <Skeleton className="h-9 w-full border rounded-2xl" key={w.label} />
          );
        })}
      </div>

      <h2 className="capitalize font-semibold text-base pt-5 pb-2.5">Colors</h2>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(twColors).map(([colorName, hexValue]) => {
          const isActive = palette.color === colorName;
          const backgroundColor =
            typeof hexValue === "string" ? hexValue : undefined;

          return mounted ? (
            <Button
              variant={"outline"}
              size="sm"
              key={colorName}
              onClick={() => {
                setPalette({
                  ...palette,
                  color: colorName,
                });
              }}
              className={cn(
                "justify-start capitalize",
                isActive &&
                  "border-2 border-primary dark:bg-slate-800 dark:border-primary"
              )}
              style={
                {
                  "--theme-primary": backgroundColor,
                } as React.CSSProperties
              }
            >
              <span
                className={cn(
                  "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                )}
              >
                {isActive && <CheckIcon className="h-4 w-4 text-white" />}
              </span>
              {colorName}
            </Button>
          ) : (
            <Skeleton
              className="h-9 w-full border rounded-2xl"
              key={colorName}
            />
          );
        })}
      </div>
    </div>
  );
}
