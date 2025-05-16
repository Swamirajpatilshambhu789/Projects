import React, { useState } from "react";
import "./Todo.css";
import deleteIcon from "./Assets/Delete.png";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInput = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { name: newTodo, isdone: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isdone: !todo.isdone } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    try {
      const newTodos = todos.filter((_, i) => i !== index);
      console.log("Filtered Todos:", newTodos);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  const TodoShowCompo = ({ todo, index }) => {
    return (
      <div className="Todocompo">
        <div className="insert">
          <input
            type="checkbox"
            checked={todo.isdone}
            onChange={() => toggleTodo(index)}
            className={todo.isdone ? "checked" : "nonchecked"}
          />
          <div
            className={
              todo.isdone ? "nameoftodowithline" : "nameoftodowithoutline"
            }
          >
            {todo.name}
          </div>
        </div>
        <div className="delete">
          <button onClick={() => handleDelete(index)} className="deletebtn">
            <img className="deletebtnimg" src={deleteIcon} alt="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="Todo">
      <div className="TodoHead">To do List:</div>
      <div className="main">
        <div className="add">
          <div className="addname">
            <div className="addinstruct">Schedule your Day</div>
            <input
              className="addinpt"
              type="text"
              onInput={handleInput}
              value={newTodo}
            />
          </div>
          <div className="button">
            <button className="addtodobtn" onClick={addTodo}>
              Add Todo
            </button>
          </div>
        </div>
        <div className="show">
          <div className="showhead"></div>
          <div className="showmain">
            {todos.map((todo, index) => (
              <TodoShowCompo key={index} todo={todo} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
