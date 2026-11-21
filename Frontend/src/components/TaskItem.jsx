const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export default function TaskItem({ task, onStatusChange, onEdit, onDelete }) {
  const done = task.status === "completed";
  return (
    <li className={`card task ${done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onStatusChange(task._id, done ? "pending" : "completed")}
        aria-label="Mark complete"
      />
      <div className="task-body">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <select value={task.status} onChange={(e) => onStatusChange(task._id, e.target.value)}>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <button className="ghost" onClick={() => onEdit(task)}>Edit</button>
      <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
    </li>
  );
}
