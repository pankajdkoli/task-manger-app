// src/redux/reducers/taskReducer.js
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  COMPLETE_TASK_SUCCESS,
} from "../actions/taskActions";

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload };
    case ADD_TASK_SUCCESS:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
        // console.log('')
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: true } : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
