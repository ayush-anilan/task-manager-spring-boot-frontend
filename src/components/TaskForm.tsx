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
        status: "TODO"
    });

    const [errors, setErrors] = useState<TaskFormError>({
        title: "",
        description: ""
    });
        useEffect(() => {
        if (editingTask) {
            setTask({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                status: editingTask.status
            });
        } else {
            setTask({
                title: "",
                description: "",
                priority: "LOW",
                status: "TODO"
            })
        }
    }, [editingTask]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            title: "",
            description: ""
        }

        if(!task.title) {
            newErrors.title = "Title is required";
        }
        if(!task.description) {
            newErrors.description = "Description is required";
        }

        if (newErrors.title || newErrors.description) {
        setErrors(newErrors);
        return;
    }

        if(editingTask && editingTask.id){
            await updateTask(editingTask.id!, task);
            setEditingTask && setEditingTask(null);
        } else {
            await createTask(task);
        }

        refreshTasks();
        setTask({
            title: "",
            description: "",
            priority: "LOW",
            status: "TODO"
        });
        setErrors({
            title: "",
            description: ""
        });
    }

    console.log("editingTask: ", editingTask);
    




    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={task.title} onChange={handleChange} />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
            <input type="text" name="description" value={task.description} onChange={handleChange} />
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            <select name="priority" value={task.priority} onChange={handleChange}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            <select name="status" value={task.status} onChange={handleChange}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            <button type="submit">{editingTask ? "Update Task" : "Create Task"}</button>
            {editingTask && <button type="button" onClick={() => setEditingTask && setEditingTask(null)}>Cancel</button>}
        </form>
    )
    
}

export default TaskForm;