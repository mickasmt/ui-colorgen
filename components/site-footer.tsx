import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";

interface SiteFooterProps {
  className: string;
  full?: boolean;
}

export function SiteFooter({ className, full = false }: SiteFooterProps) {
  return (
    <footer className={cn(className)}>
      <div
        className={cn(
          full ? "f-container" : "container",
          "flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
        )}
      >
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <p className="text-center text-sm text-muted-foreground leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              mickasmt
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . For help the project{" "}
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
