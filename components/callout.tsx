import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "warning" | "danger" | "info"
}

export function Callout({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-sky-600 bg-sky-50 dark:border-sky-300 dark:bg-sky-900/60": type === "info",
        "border-red-600 bg-red-50 dark:border-red-300 dark:bg-red-800/70": type === "danger",
        "border-yellow-600 bg-yellow-50 dark:border-yellow-300 dark:bg-yellow-800/80": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
