import { useState, useEffect } from "react";
import { Target, Check, X } from "lucide-react";

import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";

export function WeeklyGoals({ targets, onSave, isUpdating }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeDays, setActiveDays] = useState(5);
  const [weeklyHours, setWeeklyHours] = useState(30);

  useEffect(() => {
    if (targets) {
      setActiveDays(targets.activeDaysPerWeek?.min ?? 5);
      setWeeklyHours(targets.weeklyHours?.min ?? 30);
    }
  }, [targets]);

  const handleSave = () => {
    const days = Math.max(0, Math.min(7, Number(activeDays)));
    const hours = Math.max(0, Math.min(168, Number(weeklyHours)));

    onSave({
      activeDaysPerWeek: { min: days, max: days },
      weeklyHours: { min: hours, max: hours },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (targets) {
      setActiveDays(targets.activeDaysPerWeek?.min ?? 5);
      setWeeklyHours(targets.weeklyHours?.min ?? 30);
    }
    setIsEditing(false);
  };

  const currentDays = targets?.activeDaysPerWeek?.min ?? 5;
  const currentHours = targets?.weeklyHours?.min ?? 30;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Weekly Goals
          </h3>
          <p className="text-sm text-muted-foreground">
            Set your weekly targets for the dashboard progress bars
          </p>
        </div>
        {!isEditing && (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Target className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-secondary/50 rounded-lg p-4 border border-border space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Active Days per Week
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={0}
                max={7}
                value={activeDays}
                onChange={(e) => setActiveDays(e.target.value)}
                className="bg-secondary border-border w-24"
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Weekly Hours
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={0}
                max={168}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="bg-secondary border-border w-24"
              />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="lg" onClick={handleSave} disabled={isUpdating}>
              <Check className="h-4 w-4" />
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button size="lg" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Active Days</p>
            <p className="text-2xl font-bold text-foreground">
              {currentDays}
              <span className="text-sm font-normal text-muted-foreground ml-1">days/week</span>
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Weekly Hours</p>
            <p className="text-2xl font-bold text-foreground">
              {currentHours}
              <span className="text-sm font-normal text-muted-foreground ml-1">hrs/week</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
