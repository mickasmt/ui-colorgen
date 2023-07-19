"use client";

import useColors from "@/store/useColors";

import { MinusCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "./ui/scroll-area";
import InputColorPicker from "./input-color-picker";

export default function CustomizationForm() {
  const variables = useColors((state) => state.variables);
  const addVariable = useColors((state) => state.addVariable);
  const updateVariable = useColors((state) => state.updateVariable);
  const deleteVariable = useColors((state) => state.deleteVariable);

  const buttonRemoveVariable = (id: string) => (
    <div className="w-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteVariable(id)}
              className="group p-2"
            >
              <MinusCircle className="h-5 w-5 text-slate-500 group-hover:text-slate-900" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove this variable</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="flex flex-col h-auto lg:h-[820px] mt-3 w-full overflow-hidden text-sm">
      {/* Button - Add variable */}
      <div className="flex items-center justify-end pb-3">
        <Button size="sm" onClick={addVariable}>
          <Plus className="mr-2 h-4 w-4" /> Add variable
        </Button>
      </div>

      <div className="w-full overflow-auto">
        <ScrollArea className="relative h-full w-full min-w-[525px]">
          {/* Header Columns */}
          <div className="sticky top-0 bg-background flex justify-between items-center py-3 border-y">
            <span className="w-1/3 text-left align-middle font-semibold text-slate-600 dark:text-slate-400">
              Variables
            </span>
            <span className="w-1/3 text-left align-middle font-semibold text-slate-600 dark:text-slate-400">
              Light
            </span>
            <span className="w-1/3 text-left align-middle font-semibold text-slate-600 dark:text-slate-400">
              Dark
            </span>
            <span className="w-14"></span>
          </div>

          {/* List of variables */}
          <div className="[&_div:last-child]:border-0">
            {variables.map((variable) => (
              <div
                key={variable.id}
                className="flex items-center h-11 pr-4 border-b"
              >
                <div className="flex items-center w-full">
                  <div className="w-1/3 pr-3">
                    {variable.isNew ? (
                      <input
                        type="text"
                        id={`name-${variable.id}`}
                        defaultValue={variable.name}
                        onBlur={(event) =>
                          updateVariable(
                            variable.id,
                            event.target.value,
                            "name"
                          )
                        }
                        placeholder="Enter name variable"
                      />
                    ) : (
                      <span>{variable.name}</span>
                    )}
                  </div>

                  <div className="w-1/3">
                    <InputColorPicker id={variable.id} field="lightValue" colorHsl={variable.lightValue} />
                  </div>

                  <div className="w-1/3">
                    <InputColorPicker id={variable.id} field="darkValue" colorHsl={variable.darkValue} />
                  </div>
                </div>

                {buttonRemoveVariable(variable.id)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
