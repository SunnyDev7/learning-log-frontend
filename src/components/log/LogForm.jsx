import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { useCategories } from "../../hooks/useCategories.js";
import { useActivities } from "../../hooks/useActivities.js";
import { getTodayDate } from "../../lib/utils.js";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.jsx";

export function LogForm({ onActivityLogged }) {
  const { categories } = useCategories();
  const { logActivity } = useActivities();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLog = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);

    if (totalMinutes <= 0) {
      toast.error("Please enter a valid time");
      return;
    }

    const category = categories.find((c) => c._id === selectedCategory);
    if (!category) return;

    setLoading(true);

    try {
      await logActivity({
        categoryId: category._id,
        description: category.label,
        duration: totalMinutes,
        date: getTodayDate(),
      });

      toast.success(
        `Logged ${category.label} for ${hours || 0}h ${minutes || 0}m`,
      );

      setSelectedCategory("");
      setHours("");
      setMinutes("");

      onActivityLogged?.();
    } catch (error) {
      toast.error("Failed to log activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Log Activity</h2>
        <p className="text-sm text-muted-foreground">
          Select a category and enter the time spent
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Time Spent</Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                min="0"
                max="24"
                placeholder="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="text-center"
              />
              <span className="text-sm text-muted-foreground">hrs</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="0"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="text-center"
              />
              <span className="text-sm text-muted-foreground">min</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleLog}
          className="w-full"
          size="lg"
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          {loading ? "Logging..." : "Log Activity"}
        </Button>
      </div>
    </div>
  );
}
