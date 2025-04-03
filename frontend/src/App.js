import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState('');
    const [filter, setFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://127.0.0.1:8000/api/todos/';

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data || []);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const addTask = async () => {
        if (!newTask.trim()) return;
        try {
            await axios.post(API_URL, { title: newTask, completed: false });
            setNewTask('');
            fetchData();
        } catch (err) {
            console.error('Error adding task:', err);
            setError('Failed to add task.');
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            fetchData();
        } catch (err) {
            console.error('Error deleting task:', err);
            setError('Failed to delete task.');
        }
    };

    const startEditTask = (task) => {
        setEditTask(task);
        setEditedTaskText(task.title);
    };

    const updateTask = async () => {
        if (!editedTaskText.trim()) return;
        try {
            await axios.put(`${API_URL}${editTask.id}/`, { title: editedTaskText, completed: editTask.completed });
            setEditTask(null);
            fetchData();
        } catch (err) {
            console.error('Error updating task:', err);
            setError('Failed to update task.');
        }
    };

    const toggleComplete = async (task) => {
        try {
            await axios.put(`${API_URL}${task.id}/`, { title: task.title, completed: !task.completed });
            fetchData();
        } catch (err) {
            console.error('Error toggling task:', err);
            setError('Failed to update task.');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
            <h1>To-Do List</h1>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
            <div>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </div>
            <button className="add-task" onClick={addTask}>Add Task</button>
            <div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <li>No tasks found.</li>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            {editTask && editTask.id === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTaskText}
                                        onChange={(e) => setEditedTaskText(e.target.value)}
                                    />
                                    <button onClick={updateTask}>Save</button>
                                    <button onClick={() => setEditTask(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task)}
                                    />
                                    <span onClick={() => startEditTask(task)}>{task.title}</span>
                                    <button onClick={() => startEditTask(task)}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;