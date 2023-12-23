import axios from "axios";

export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const COMPLETE_TASK_SUCCESS = "COMPLETE_TASK_SUCCESS";
export const ERROR = "ERROR";

// Fetch tasks
export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5001/api/getalltasks");
    console.log(response.data); // Log the response
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    console.error(" Error fetching tasks: ", error);
    dispatch({ type: ERROR, payload: error.message });
  }
};

// Add a new task
export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

// src/actions/taskActions.js
export const addTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/createtask",
      taskData
    );

    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    console.error("Error adding task:", error);
    dispatch({ type: ERROR, payload: error.message });
  }
};

// Edit an existing task
export const updateTaskSuccess = (taskId, updatedTask) => ({
  type: EDIT_TASK_SUCCESS,
  payload: { taskId, updatedTask },
});

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5001/api/updatetask/${taskId}`,
      updatedTaskData
    );
    dispatch(updateTaskSuccess(taskId, response.data));
  } catch (error) {
    console.error("Error updating task:", error);
    dispatch({ type: ERROR, payload: error.message });
  }
};

// Delete a task
export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5001/api/deletetask/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    dispatch({ type: ERROR, payload: error.message });
  }
};

// Complete a task
export const completeTaskSuccess = (taskId) => ({
  type: COMPLETE_TASK_SUCCESS,
  payload: taskId,
});

export const completeTask = (taskId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5001/api/updatetask/${taskId}`, {
      completed: true,
    });
    dispatch(completeTaskSuccess(taskId));
  } catch (error) {
    console.error("Error completing task:", error);
    dispatch({ type: ERROR, payload: error.message });
  }
};
