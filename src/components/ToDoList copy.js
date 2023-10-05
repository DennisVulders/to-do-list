import React, { useState } from 'react';
import '../assets/main.scss';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // State for completed tasks
  const [newTask, setNewTask] = useState('');
  const [currentlyEditingTask, setCurrentlyEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    const taskToCompleteIndex = tasks.findIndex((task) => task.id === id);
    if (taskToCompleteIndex !== -1) {
      // Create a copy of the tasks array without the completed task
      const updatedTasks = [...tasks];
      updatedTasks.splice(taskToCompleteIndex, 1);
  
      // Move the completed task to the completedTasks state
      const taskToComplete = tasks.find((task) => task.id === id);
      setTasks(updatedTasks);
      setCompletedTasks([...completedTasks, taskToComplete]);
    }
  };
  
  const deleteTask = (id) => {
    const taskToDeleteIndex = tasks.findIndex((task) => task.id === id);
    if (taskToDeleteIndex !== -1) {
      // Create a copy of the tasks array without the deleted task
      const updatedTasks = [...tasks];
      updatedTasks.splice(taskToDeleteIndex, 1);
  
      setTasks(updatedTasks);
    }
  };

  const maxTaskListHeight = tasks.length > 0 ? '400px' : '100px';
  const maxCompletedListHeight = completedTasks.length > 0 ? '400px' : '100px';

  return (
    <div className="todo-app">
      <div className='app-header'>
        <h2>To-Do List</h2>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
      </div>
      <div className="list-wrapper">
        <div className="todo-list" style={{ maxHeight: maxTaskListHeight }}>
          <h2>Task List</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {currentlyEditingTask === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={task.text}
                      onChange={(e) => editTask(task.id, e.target.value)}
                    />
                    <button onClick={() => setCurrentlyEditingTask(null)}>Save</button>
                  </div>
                ) : (
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#555' : '#007bff',
                    }}
                  >
                    {task.text}
                  </span>
                )}
                <div className='btn-container'>
                  <button onClick={() => completeTask(task.id)}>
                    {task.completed ? 'Uncomplete' : 'Complete'}
                  </button>
                  <button onClick={() => setCurrentlyEditingTask(task.id)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>

              </li>
            ))}
          </ul>
        </div>
        <div className="completed-list" style={{ maxHeight: maxCompletedListHeight }}>
          <h2>Completed List</h2>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id}>
                <span
                  style={{
                    textDecoration: 'line-through',
                    color: '#555',
                  }}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
