import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/v2/nav-menu";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex h-14 md:h-16">
      <div className="container mx-auto grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] items-center gap-x-3 lg:gap-x-5 md:grid-cols-[1fr_minmax(auto,340px)_1fr] lg:grid-cols-[1fr_minmax(auto,450px)_1fr] xl:grid-cols-3">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Icons.logo />
            <span className="text-lg font-semibold">{siteConfig.name}</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link
              href="https://github.com/mickasmt/next-saas-stripe-starter"
              className="flex items-center justify-center gap-x-2 md:px-4"
              target="_blank"
            >
              <Icons.sparkles className="size-4" />
              <span className="text-base font-medium">
                Next SaaS Stripe Starter{" "}
                <span className="hidden lg:inline-block">on Github</span>
              </span>
            </Link>
          </Button>
        </div>

        <div className="shrink-0 items-end">
          <div className="flex flex-row items-center justify-end space-x-2">
            {/* <Button variant="default" size="lg" className="px-4" asChild>
              <Link href="/custom-form">Custom Form</Link>
            </Button> */}
            <NavMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
