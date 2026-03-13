import { CategoryManager } from "../components/settings/CategoryManager.jsx";
import { WeeklyGoals } from "../components/settings/WeeklyGoals.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useTargets } from "../hooks/useTargets.js";

export default function SettingsPage() {
  const { categories, addCategory, updateCategory, deleteCategory, isLoading } =
    useCategories();
  const { targets, updateTargets, isUpdating } = useTargets();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <WeeklyGoals
        targets={targets}
        onSave={updateTargets}
        isUpdating={isUpdating}
      />

      <hr className="border-border" />

      <CategoryManager
        categories={categories}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
      />
    </div>
  );
}
