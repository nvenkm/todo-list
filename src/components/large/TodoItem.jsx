/* eslint-disable react/prop-types */
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTodo, editTodo } from "../../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

const TodoItem = ({ todoItem }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState(todoItem.text);

  function handleToggleComplete() {
    console.log(!todoItem.completed);
    dispatch(
      editTodo({
        id: todoItem.id,
        text: editText,
        completed: !todoItem.completed,
      })
    );
  }

  return (
    <div
      className={twMerge(
        "flex items-start relative gap-4 border-2 border-slate-400 p-4 ",
        isDisabled ? "bg-blue-800" : "bg-blue-900",
        todoItem.completed ? "bg-green-700" : ""
      )}
    >
      <textarea
        className={twMerge(
          "py-2 bg-transparent border-none w-3/5 resize-none",
          "rounded-md outline-none mr-auto"
        )}
        type="text "
        value={editText}
        disabled={isDisabled}
        onChange={(e) => setEditText(e.target.value)}
      />

      <div className="right-4 flex items-center gap-3">
        <button
          onClick={handleToggleComplete}
          className={twMerge(
            "px-3 border-2 border-solid rounded-sm text-base",
            todoItem.completed ? "border-white" : "border-green-500"
          )}
        >
          {todoItem.completed ? "Undo Complete" : "Complete"}
        </button>
        {isDisabled ? (
          <EditIcon
            onClick={() => {
              setIsDisabled(!isDisabled);
            }}
            className="cursor-pointer"
          />
        ) : (
          <DoneIcon
            onClick={() => {
              setIsDisabled(!isDisabled);
              dispatch(
                editTodo({
                  id: todoItem.id,
                  text: editText,
                  completed: todoItem.completed,
                })
              );
            }}
            className="cursor-pointer"
          />
        )}
        <DeleteIcon
          onClick={() => {
            dispatch(deleteTodo({ id: todoItem.id }));
          }}
          className="cursor-pointer "
        />
      </div>
    </div>
  );
};

export default TodoItem;
