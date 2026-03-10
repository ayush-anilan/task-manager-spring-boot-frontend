import { useState } from "react";
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    refreshTasks: () => void;
    setEditingTask: (task: Task | null) => void;
}

function TaskList({ tasks, refreshTasks, setEditingTask }: TaskListProps) {

    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} setEditingTask={setEditingTask} />
            ))}
        </div>
    )
}

export default TaskList