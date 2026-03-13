import { deleteTask } from "../api/taskApi";
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  refreshTasks: () => void;
  setEditingTask: (task: Task | null) => void;
}

const priorityConfig: Record<string, { label: string; class: string }> = {
  LOW: { label: "Low", class: "text-stone-400 border-stone-700" },
  MEDIUM: { label: "Medium", class: "text-blue-400 border-blue-800" },
  HIGH: { label: "High", class: "text-rose-400 border-rose-900" },
};

const statusConfig: Record<string, { label: string; dot: string }> = {
  TODO: { label: "To Do", dot: "bg-stone-500" },
  IN_PROGRESS: { label: "In Progress", dot: "bg-blue-400" },
  DONE: { label: "Done", dot: "bg-emerald-400" },
};

function TaskItem({ task, refreshTasks, setEditingTask }: TaskItemProps) {
  const handleDelete = async () => {
    if (!task.id) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(task.id);
    refreshTasks();
  };

  const priority = priorityConfig[task.priority] ?? priorityConfig.LOW;
  const status = statusConfig[task.status] ?? statusConfig.TODO;
  const isDone = task.status === "DONE";

  return (
    <div
      className={`bg-stone-900 border border-stone-800 p-4 flex items-start justify-between gap-4 group hover:border-stone-600 transition-colors ${
        isDone ? "opacity-50" : ""
      }`}
    >
      {/* Left: content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-bold text-stone-100 truncate mb-1 ${
            isDone ? "line-through text-stone-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-xs text-stone-500 truncate mb-3">{task.description}</p>

        <div className="flex items-center gap-3">
          {/* Status badge */}
          <span className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>

          <span className="text-stone-700">·</span>

          {/* Priority badge */}
          <span
            className={`text-xs border px-1.5 py-0.5 uppercase tracking-widest ${priority.class}`}
          >
            {priority.label}
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1 text-stone-500">
            <span className="text-sm">
            Created At: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A"}
            </span>
            <span className="text-sm">
                Updated At: {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}
            </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => setEditingTask(task)}
          className="text-xs text-stone-400 border border-stone-700 px-3 py-1.5 hover:border-amber-400 hover:text-amber-400 transition-colors uppercase tracking-widest"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs text-stone-400 border border-stone-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
        >
          Del
        </button>
      </div>
    </div>
  );
}

export default TaskItem;