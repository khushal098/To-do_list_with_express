import { useEffect, useState } from "react";

const empty = { title: "", description: "" };

export default function TaskForm({ editingTask, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editingTask ? { title: editingTask.title, description: editingTask.description || "" } : empty);
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const ok = await onSubmit({ title: form.title.trim(), description: form.description.trim() });
    if (ok) setForm(empty);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit task" : "Add a task"}</h2>
      <input
        placeholder="Title *"
        value={form.title}
        maxLength={120}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description (optional)"
        value={form.description}
        maxLength={500}
        rows={2}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="row">
        <button type="submit" disabled={saving || !form.title.trim()}>
          {saving ? "Saving..." : editingTask ? "Update" : "Add task"}
        </button>
        {editingTask && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
