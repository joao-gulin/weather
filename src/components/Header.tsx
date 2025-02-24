import { CloudMoon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 
    backdrop-blur supports-[backfrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <CloudMoon className="h-14"/>
      </div>

      <div className="flex gap-4">
        <ThemeToggle />
      </div>
    </header>
  )
}