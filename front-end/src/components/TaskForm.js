import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";
import "./styles/TaskForm.css";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(taskData));
    setTaskData({ title: "", description: "", completed: false });
  };

  return (
    <div>
      <h2>Add New Task:-</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          required
        />
        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
