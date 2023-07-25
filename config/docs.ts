import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Colors",
          href: "/docs/documentation/colors",
        },
        {
          title: "Variables",
          href: "/docs/documentation/variables",
        },
        {
          title: "Files generated",
          href: "/docs/documentation/files-generated",
        },
        {
          title: "Preview components",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}
