import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCheck, Clipboard } from "lucide-react";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  classNames?: string;
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
  }
}

export function CopyButton({
  value,
  classNames,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2500);
  }, [hasCopied]);

  const handleCopy = React.useCallback(() => {
    copyToClipboard(value);
    setHasCopied(true);
  }, [value]);

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        "relative z-10 h-7 w-auto text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <div className="flex items-center justify-center">
          <CheckCheck className="h-4 w-4" />
          <span className="ml-2">Copied</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Clipboard className="h-4 w-4" />
          <span className="ml-2">Copy</span>
        </div>
      )}
    </Button>
  );
}
