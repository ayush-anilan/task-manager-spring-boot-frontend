import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import type { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home(){

    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        const res = await getTasks();
        setTasks(res.data);
    }

    useEffect(() => {   
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task Manager</h1>

            <TaskForm refreshTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />

            <TaskList tasks={tasks} refreshTasks={fetchTasks} setEditingTask={setEditingTask} />
        </div>
    );
}

export default Home;