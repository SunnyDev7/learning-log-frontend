import { CategoryManager } from "../components/settings/CategoryManager.jsx";
import { useCategories } from "../hooks/useCategories.js";

export default function SettingsPage() {
  const { categories, addCategory, updateCategory, deleteCategory, isLoading } =
    useCategories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <CategoryManager
        categories={categories}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
      />
    </div>
  );
}
