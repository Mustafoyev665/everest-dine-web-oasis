
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-gray-300 hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform animate-scale-in" />
      ) : (
        <Moon className="h-4 w-4 transition-transform animate-scale-in" />
      )}
    </Button>
  );
}
