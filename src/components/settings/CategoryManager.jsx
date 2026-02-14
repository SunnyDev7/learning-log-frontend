import { useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Check, X } from "lucide-react";

import { PRESET_COLORS, PRESET_ICONS } from "../../lib/constants.js";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";

export function CategoryEditForm({ category, onSave, onCancel }) {
  const [label, setLabel] = useState(category?.label || "");
  const [icon, setIcon] = useState(category?.icon || "📝");
  const [color, setColor] = useState(category?.color || PRESET_COLORS[1]);
  const [description, setDescription] = useState(category?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    onSave({
      label: label.trim(),
      icon,
      color,
      description: description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Name
        </label>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Category name"
          className="bg-secondary border-border"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Icon
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_ICONS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                icon === i
                  ? "bg-primary/20 ring-2 ring-primary"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-all ${
                color === c
                  ? "ring-2 ring-offset-2 ring-offset-background ring-primary"
                  : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Description{" "}
          <span className="text-muted-foreground font-normal">
            (helps AI categorize activities)
          </span>
        </label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Online courses and tutorials"
          className="bg-secondary border-border"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1" disabled={!label.trim()}>
          <Check className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function CategoryManager({ categories, onAdd, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (data) => {
    onAdd(data);
    setIsAdding(false);
  };

  const handleUpdate = (id, data) => {
    onUpdate(id, data);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Activity Categories
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize categories to match your learning goals
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {isAdding && (
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">
            New Category
          </h4>
          <CategoryEditForm
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category._id || category.id}>
            {editingId === (category._id || category.id) ? (
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <CategoryEditForm
                  category={category}
                  onSave={(data) =>
                    handleUpdate(category._id || category.id, data)
                  }
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border group">
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab" />
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">
                    {category.label}
                  </p>
                  {category.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setEditingId(category._id || category.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(category._id || category.id)}
                    disabled={categories.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

//wraps CategoryManager inside a small popup window
// export function CategorySettingsDialog({
//   categories,
//   onAdd,
//   onUpdate,
//   onDelete,
//   trigger,
// }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         {trigger || (
//           <Button variant="outline" size="sm">
//             Manage Categories
//           </Button>
//         )}
//       </DialogTrigger>
//       <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Settings</DialogTitle>
//         </DialogHeader>
//         <CategoryManager
//           categories={categories}
//           onAdd={onAdd}
//           onUpdate={onUpdate}
//           onDelete={onDelete}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }
