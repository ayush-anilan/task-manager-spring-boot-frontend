import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import type { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-mono">
      {/* Header */}
      <header className="border-b border-stone-800 px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight text-stone-100 uppercase">
              Task Manager
            </h1>
          </div>
          <div className="flex gap-6 text-xs text-stone-400 uppercase tracking-widest">
            <span>
              <span className="text-amber-400 font-bold">{todoCount}</span> Todo
            </span>
            <span>
              <span className="text-blue-400 font-bold">{inProgressCount}</span> In Progress
            </span>
            <span>
              <span className="text-emerald-400 font-bold">{doneCount}</span> Done
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Form */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
              {editingTask ? "— Edit Task" : "— New Task"}
            </p>
            <TaskForm
              refreshTasks={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          </div>
        </aside>

        {/* Task List */}
        <section className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
            — {tasks.length} Tasks
          </p>
          <TaskList
            tasks={tasks}
            refreshTasks={fetchTasks}
            setEditingTask={setEditingTask}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;