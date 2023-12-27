import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import ThemeToggle from "./theme-toggle";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-11 cursor-pointer data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          <Icons.menu className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 overflow-hidden">
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href={siteConfig.links.github}
            target="_blank"
          >
            <span>Github</span>
            <Icons.arrowUpRight />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href={siteConfig.links.twitter}
            target="_blank"
          >
            <span>Twitter</span>
            <Icons.arrowUpRight />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href="https://mickasmt.com/"
            target="_blank"
          >
            <span>Portfolio</span>
            <Icons.arrowUpRight />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
