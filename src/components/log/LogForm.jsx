import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LogForm({ onActivityLogged }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [loading, setLoading] = useState(false);

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

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {loading ? "Logging..." : "Log Activity"}
        </Button>
      </div>
    </div>
  );
}
