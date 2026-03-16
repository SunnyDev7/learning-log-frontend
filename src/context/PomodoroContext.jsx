import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const PomodoroContext = createContext(null);

export function PomodoroProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [initialMinutes, setInitialMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [accumulatedElapsed, setAccumulatedElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning || !startTimestamp) return;

    const totalDuration = initialMinutes * 60;

    const tick = () => {
      const now = Date.now();
      const currentRunElapsed = Math.floor((now - startTimestamp) / 1000);
      const totalElapsed = accumulatedElapsed + currentRunElapsed;
      const remaining = Math.max(totalDuration - totalElapsed, 0);

      setElapsedTime(totalElapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsRunning(false);
        setAccumulatedElapsed(totalElapsed);
        setStartTimestamp(null);
        toast.success("Timer completed! Don't forget to log your activity.");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTimestamp, accumulatedElapsed, initialMinutes]);

  const handleStart = useCallback((categoryId) => {
    if (!categoryId) {
      toast.error("Please select a category first");
      return;
    }
    setSelectedCategory(categoryId);
    setStartTimestamp(Date.now());
    setIsRunning(true);
    setHasStarted(true);
  }, []);

  const handlePause = useCallback(() => {
    if (startTimestamp) {
      const currentRunElapsed = Math.floor((Date.now() - startTimestamp) / 1000);
      setAccumulatedElapsed((prev) => prev + currentRunElapsed);
    }
    setStartTimestamp(null);
    setIsRunning(false);
  }, [startTimestamp]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
    setHasStarted(false);
    setElapsedTime(0);
    setStartTimestamp(null);
    setAccumulatedElapsed(0);
  }, [initialMinutes]);

  const handleSetTime = useCallback((minutes) => {
    setInitialMinutes(minutes);
    setTimeLeft(minutes * 60);
    setHasStarted(false);
    setElapsedTime(0);
    setIsRunning(false);
    setStartTimestamp(null);
    setAccumulatedElapsed(0);
  }, []);

  return (
    <PomodoroContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        initialMinutes,
        timeLeft,
        isRunning,
        hasStarted,
        elapsedTime,
        handleStart,
        handlePause,
        handleReset,
        handleSetTime,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
}
