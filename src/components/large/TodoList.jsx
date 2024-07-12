import { useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { createTodo } from "../../features/todo/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
const TodoList = () => {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      dispatch(
        createTodo({
          text: newTask,
          completed: false,
        })
      );
      setNewTask("");
      inputRef.current.focus();
    }
  }

  function handleButtonPress() {
    dispatch(
      createTodo({
        text: newTask,
        completed: false,
      })
    );
    setNewTask("");
    inputRef.current.focus();
  }

  return (
    <div className="w-[90%] flex flex-col gap-7 justify-center">
      <div className="flex relative flex-row gap-5 items-center">
        <input
          ref={inputRef}
          className="p-3 border-2 border-slate-400 bg-blue-900 rounded-md outline-none w-full mx-auto"
          type="text "
          placeholder="Add new task ✅..."
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          value={newTask}
          onKeyDown={handleKeyPress}
        />
        <AddIcon
          onClick={handleButtonPress}
          className="cursor-pointer absolute right-4"
        />
      </div>

      <h2 className="text-3xl font-bold">Tasks:</h2>

      <div className="flex flex-col gap-5 w-full max-h-[65vh] lg:max-h-[50vh] p-4 overflow-auto no-scrollbar bg-black/20 rounded-lg">
        {todos.map((task) => (
          <TodoItem key={task.id} todoItem={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
