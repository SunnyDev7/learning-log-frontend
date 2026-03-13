import { useState, useEffect } from "react";
import { Target, Check, X } from "lucide-react";

import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";

export function WeeklyGoals({ targets, onSave, isUpdating }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeDaysMin, setActiveDaysMin] = useState(5);
  const [activeDaysMax, setActiveDaysMax] = useState(6);
  const [weeklyHoursMin, setWeeklyHoursMin] = useState(30);
  const [weeklyHoursMax, setWeeklyHoursMax] = useState(48);

  useEffect(() => {
    if (targets) {
      setActiveDaysMin(targets.activeDaysPerWeek?.min ?? 5);
      setActiveDaysMax(targets.activeDaysPerWeek?.max ?? 6);
      setWeeklyHoursMin(targets.weeklyHours?.min ?? 30);
      setWeeklyHoursMax(targets.weeklyHours?.max ?? 48);
    }
  }, [targets]);

  const handleSave = () => {
    const dMin = Math.max(0, Math.min(7, Number(activeDaysMin)));
    const dMax = Math.max(dMin, Math.min(7, Number(activeDaysMax)));
    const hMin = Math.max(0, Math.min(168, Number(weeklyHoursMin)));
    const hMax = Math.max(hMin, Math.min(168, Number(weeklyHoursMax)));

    onSave({
      activeDaysPerWeek: { min: dMin, max: dMax },
      weeklyHours: { min: hMin, max: hMax },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (targets) {
      setActiveDaysMin(targets.activeDaysPerWeek?.min ?? 5);
      setActiveDaysMax(targets.activeDaysPerWeek?.max ?? 6);
      setWeeklyHoursMin(targets.weeklyHours?.min ?? 30);
      setWeeklyHoursMax(targets.weeklyHours?.max ?? 48);
    }
    setIsEditing(false);
  };

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
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block">
              Active Days per Week
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <span className="text-xs text-muted-foreground mb-1 block">Min</span>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  value={activeDaysMin}
                  onChange={(e) => setActiveDaysMin(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <span className="text-muted-foreground mt-5">–</span>
              <div className="flex-1">
                <span className="text-xs text-muted-foreground mb-1 block">Max</span>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  value={activeDaysMax}
                  onChange={(e) => setActiveDaysMax(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <span className="text-muted-foreground mt-5 text-sm">days</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block">
              Weekly Hours
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <span className="text-xs text-muted-foreground mb-1 block">Min</span>
                <Input
                  type="number"
                  min={0}
                  max={168}
                  value={weeklyHoursMin}
                  onChange={(e) => setWeeklyHoursMin(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <span className="text-muted-foreground mt-5">–</span>
              <div className="flex-1">
                <span className="text-xs text-muted-foreground mb-1 block">Max</span>
                <Input
                  type="number"
                  min={0}
                  max={168}
                  value={weeklyHoursMax}
                  onChange={(e) => setWeeklyHoursMax(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <span className="text-muted-foreground mt-5 text-sm">hours</span>
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
              {targets?.activeDaysPerWeek?.min ?? 5}–{targets?.activeDaysPerWeek?.max ?? 6}
              <span className="text-sm font-normal text-muted-foreground ml-1">days/week</span>
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Weekly Hours</p>
            <p className="text-2xl font-bold text-foreground">
              {targets?.weeklyHours?.min ?? 30}–{targets?.weeklyHours?.max ?? 48}
              <span className="text-sm font-normal text-muted-foreground ml-1">hrs/week</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
