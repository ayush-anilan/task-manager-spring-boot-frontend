import { deleteTask, updateTask } from "../api/taskApi";
import type { Task } from "../types/task";

interface TaskItemProps {
    // Define any props you need for the TaskItem component
    task: Task;
    refreshTasks: () => void;
    setEditingTask: (task: Task | null) => void;
}

function TaskItem({ task, refreshTasks, setEditingTask }: TaskItemProps) {

    const handleDelete = async () => {
        if(!task.id) return;
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        await deleteTask(task.id);
        refreshTasks();
    }

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() =>  {console.log(task); setEditingTask(task)}}>Edit</button>
        </div>
    )
}

export default TaskItem;