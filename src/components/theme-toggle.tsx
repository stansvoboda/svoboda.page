import { IconMoon, IconSun } from "@tabler/icons-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { toggleTheme } = useTheme()

  // Both icons are always rendered and CSS shows the right one, so the
  // prerendered HTML matches whatever theme the visitor ends up with.
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <IconSun className="dark:hidden" />
      <IconMoon className="hidden dark:block" />
    </Button>
  )
}
