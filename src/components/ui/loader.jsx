import { BookOpen } from "lucide-react";
import { cn } from "../../lib/utils.js";

export function Loader({ message = "Loading...", fullScreen = false, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        !fullScreen && "min-h-screen bg-background",
        className
      )}
    >
      <div className="relative">
        {/* Spinning ring */}
        <div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-primary" />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
}
