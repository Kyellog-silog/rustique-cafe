import { Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  isScrolled?: boolean
}

export function Logo({ isScrolled = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Coffee className={cn("h-8 w-8 transition-colors", isScrolled ? "text-primary" : "text-white")} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xl font-bold tracking-tight transition-colors",
            isScrolled ? "text-primary" : "text-white",
          )}
        >
          Rustique
        </span>
        <span
          className={cn(
            "text-xs -mt-1 tracking-wider transition-colors",
            isScrolled ? "text-muted-foreground" : "text-white/80",
          )}
        >
          CAFÉ
        </span>
      </div>
    </div>
  )
}
