import { useState } from "react";
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  refreshTasks: () => void;
  setEditingTask: (task: Task | null) => void;
  filterTasks: (status: string, priority: string) => void;
}

function TaskList({ tasks, refreshTasks, setEditingTask, filterTasks }: TaskListProps) {
    const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        filterTasks(e.target.value, priorityFilter);
    };

    const handlePriorityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriorityFilter(e.target.value);
        filterTasks(statusFilter, e.target.value);
    }

  return (
    <div className="flex flex-col gap-3">
        <div className="flex gap-3">
        <div>
            Filter By Status:
            <select className="ml-2 p-1 text-sm bg-stone-900 border border-stone-700 text-stone-100" value={statusFilter} onChange={(e) => handleStatusFilterChange(e)}>
                <option value="">All</option>   
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
        </div>
        <div>
            Filter By Priority:
            <select className="ml-2 p-1 text-sm bg-stone-900 border border-stone-700 text-stone-100" value={priorityFilter} onChange={(e) => handlePriorityFilterChange(e)}>
                <option value="">All</option>   
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>  
            </select>   
        </div>
        <div>
            <button
  className="text-xs border px-2 py-1"
  onClick={() => {
    setStatusFilter("");
    setPriorityFilter("");
    filterTasks("", "");
  }}
>
  Reset
</button>
        </div>
        </div>
    {/* Empty State */}
    {tasks.length === 0 ? (
      <div className="border border-dashed border-stone-800 p-12 text-center">
        <p className="text-stone-600 text-xs uppercase tracking-widest">
          No tasks found for selected filter
        </p>
      </div>
    ) : (
      tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          refreshTasks={refreshTasks}
          setEditingTask={setEditingTask}
        />
      ))
    )}
    </div>
  );
}

export default TaskList;