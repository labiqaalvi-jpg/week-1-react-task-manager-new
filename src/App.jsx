import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  // Add Task with validation
  const addTask = (e) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      setError('Please enter a valid task name!');
      return;
    }
    setError('');
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskText('');
  };

  // Toggle Complete Status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        {/* Header Section */}
        <header className="header">
          <h1>Task Manager</h1>
          <p>AUREX Internship • Month 2</p>
        </header>

        {/* Form Section */}
        <form onSubmit={addTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="What needs to be done today?..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="task-input"
            />
            <button type="submit" className="add-btn">Add Task</button>
          </div>
          {error && <span className="error-msg">{error}</span>}
        </form>

        {/* Task List Section */}
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks added yet. Start by adding one above! 🚀</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <span 
                    className="task-text"
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.text}
                  </span>
                  <div className="task-actions">
                    <button 
                      onClick={() => toggleComplete(task.id)}
                      className={`action-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`}
                    >
                      {task.completed ? 'Undo' : 'Done'}
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
        
