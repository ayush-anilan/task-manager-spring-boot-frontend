import { useEffect, useState } from "react";
import { createTask, updateTask } from "../api/taskApi";
import type { Task } from "../types/task";

interface TaskFormProps {
  refreshTasks: () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

interface TaskFormError {
  title: string;
  description: string;
}

function TaskForm({ refreshTasks, editingTask, setEditingTask }: TaskFormProps) {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "LOW",
    status: "TODO",
  });

  const [errors, setErrors] = useState<TaskFormError>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
      });
    } else {
      setTask({ title: "", description: "", priority: "LOW", status: "TODO" });
    }
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { title: "", description: "" };
    if (!task.title) newErrors.title = "Title is required";
    if (!task.description) newErrors.description = "Description is required";

    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    if (editingTask && editingTask.id) {
      await updateTask(editingTask.id!, task);
      setEditingTask(null);
    } else {
      await createTask(task);
    }

    refreshTasks();
    setTask({ title: "", description: "", priority: "LOW", status: "TODO" });
    setErrors({ title: "", description: "" });
  };

  const inputClass =
    "w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-400 transition-colors placeholder-stone-600";

  const labelClass = "block text-xs uppercase tracking-widest text-stone-500 mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-stone-900 border border-stone-800 p-5 flex flex-col gap-4"
    >
      {/* Title */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task title..."
          className={inputClass}
        />
        {errors.title && (
          <p className="text-amber-400 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="What needs to be done..."
          className={inputClass}
        />
        {errors.description && (
          <p className="text-amber-400 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label className={labelClass}>Priority</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className={labelClass}>Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-widest py-2 px-4 hover:bg-amber-300 transition-colors"
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={() => setEditingTask(null)}
            className="bg-transparent border border-stone-700 text-stone-400 text-xs uppercase tracking-widest py-2 px-4 hover:border-stone-500 hover:text-stone-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;