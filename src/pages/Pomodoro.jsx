import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Clock, Timer } from "lucide-react";
import { toast } from "sonner";

import { useCategories } from "../hooks/useCategories.js";
import { useActivities } from "../hooks/useActivities.js";
import { getTodayDate } from "../lib/utils.js";
import { TIME_PRESETS } from "../lib/constants.js";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.jsx";

const PomodoroPage = () => {
  const { categories } = useCategories();
  const { logActivity } = useActivities();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [initialMinutes, setInitialMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      toast.success("Timer completed! Don't forget to log your activity.");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!selectedCategory) {
      toast.error("Please select a category first");
      return;
    }
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
    setHasStarted(false);
    setElapsedTime(0);
  };

  const handleSetTime = (minutes) => {
    setInitialMinutes(minutes);
    setTimeLeft(minutes * 60);
    setHasStarted(false);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleLog = useCallback(async () => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const elapsedMinutes = Math.floor(elapsedTime / 60);
    if (elapsedMinutes < 1) {
      //TODO: increase the time later
      toast.error("You need at least 1 minute to log");
      return;
    }

    const category = categories.find((c) => c._id === selectedCategory);
    if (!category) {
      toast.error("Category not found");
      return;
    }

    try {
      await logActivity({
        categoryId: selectedCategory,
        duration: elapsedMinutes,
        description: `Pomodoro session - ${category.label}`,
        date: getTodayDate(),
      });

      toast.success(`Logged ${elapsedMinutes} minutes of ${category.label}`);
      handleReset();
    } catch (error) {
      toast.error("Failed to log activity");
    }
  }, [selectedCategory, elapsedTime, categories, logActivity]);

  const canLog = !isRunning && hasStarted && elapsedTime >= 60;
  const progress =
    ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Focus Timer</h1>
        <p className="text-sm text-muted-foreground">
          Stay focused with the Pomodoro technique
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex flex-col items-center justify-center py-8">
            <div
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: `conic-gradient(hsl(var(--primary)) ${progress}%, transparent ${progress}%)`,
              }}
            />
            <div className="text-6xl font-mono font-bold text-foreground tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {hasStarted && `Elapsed: ${formatTime(elapsedTime)}`}
            </div>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Set Time ({initialMinutes} min)
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border border-border z-50">
                {TIME_PRESETS.map((preset) => (
                  <DropdownMenuItem
                    key={preset.minutes}
                    onClick={() => handleSetTime(preset.minutes)}
                    className="cursor-pointer"
                  >
                    {preset.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-center gap-3">
            {!isRunning ? (
              <Button
                size="lg"
                onClick={handleStart}
                className="gap-2 px-8"
                disabled={timeLeft === 0}
              >
                <Play className="h-5 w-5" />
                {hasStarted ? "Resume" : "Start"}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handlePause}
                variant="secondary"
                className="gap-2 px-8"
              >
                <Pause className="h-5 w-5" />
                Pause
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleLog}
            disabled={!canLog}
          >
            Log Activity ({Math.floor(elapsedTime / 60)} min)
          </Button>

          {!canLog && hasStarted && (
            <p className="text-xs text-center text-muted-foreground">
              Pause the timer to log your activity
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroPage;
