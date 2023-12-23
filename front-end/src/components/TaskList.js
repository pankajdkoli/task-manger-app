import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  completeTask,
  deleteTask,
  updateTask,
} from "../actions/taskActions";
import "./styles/TaskList.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(
    (getall) => {
      dispatch(fetchTasks());
    },
    [dispatch]
  );

  const handleComplete = (taskId) => {
    dispatch(completeTask(taskId));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const [editableTask, setEditableTask] = useState(null);

  const handleEdit = (task) => {
    setEditableTask(task);
  };

  const handleUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask.id, updatedTask));
    setEditableTask(null);
  };

  const handleCancelEdit = () => {
    setEditableTask(null);
  };
  return (
    <div className="TaskList">
      <h2>Task List</h2>

      <table>
        <thead>
          <tr>
            <th> Title </th>
            <th>Description</th>
            <th>Completion Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr
                key={task.id}
                className={task.completed ? "completed-task" : ""}
              >
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? "Completed" : "Incomplete"}</td>
                <td>
                  <button onClick={() => handleComplete(task.id)}>
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editableTask && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editableTask.title}
            onChange={(e) =>
              setEditableTask({ ...editableTask, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editableTask.description}
            onChange={(e) =>
              setEditableTask({
                ...editableTask,
                description: e.target.value,
              })
            }
          />
          <button onClick={() => handleUpdate(editableTask)}>Update</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
