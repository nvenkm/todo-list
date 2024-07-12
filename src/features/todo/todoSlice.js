import { createSlice } from "@reduxjs/toolkit";

// Utility functions to interact with localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Initialize state from localStorage
const initialState = loadState();

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: (state, action) => {
      console.log(action);
      state.push({
        // Add one to the last todo id
        id: state[state?.length - 1]?.id + 1 || 1,
        text: action.payload.text,
        completed: action.payload.completed,
      });
      saveState(state); // Save to localStorage
    },
    deleteTodo: (state, action) => {
      const id = action.payload.id;
      const newState = state.filter((todo) => todo.id !== id);
      saveState(newState); // Save to localStorage
      return newState;
    },
    editTodo: (state, action) => {
      const id = action.payload.id;
      const todoToEdit = state.find((todo) => todo.id === id);
      todoToEdit.text = action.payload.text;
      todoToEdit.completed = action.payload.completed;
      saveState(state); // Save to localStorage
    },
  },
});

export const { createTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
