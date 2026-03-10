import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  refreshTasks: () => void;
  setEditingTask: (task: Task | null) => void;
}

function TaskList({ tasks, refreshTasks, setEditingTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="border border-dashed border-stone-800 p-12 text-center">
        <p className="text-stone-600 text-xs uppercase tracking-widest">
          No tasks yet — create one to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          refreshTasks={refreshTasks}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;