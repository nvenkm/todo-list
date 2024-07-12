import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/todo/todoSlice";
export default configureStore({
  reducer: {
    todos: counterReducer,
  },
});
