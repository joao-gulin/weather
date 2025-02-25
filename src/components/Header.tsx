import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/context/theme-provider";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-grow">
          <img
            src={theme === "dark" ? "/public/logo2.jpg" : "./public/logo1.jpg"}
            alt="Klimate logo"
            className="h-14"
          />
        </div>

        <div className="flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
