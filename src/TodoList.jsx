import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {

  const [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false }
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false }
    ]);

    setNewTodo("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        addNewTask();
    }
  };

  const updateTaskValue = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase()
      }))
    );
  };

  const upperCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, task: todo.task.toUpperCase() }
          : todo
      )
    );
  };

  const lowerCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toLowerCase()
      }))
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isDone: true }
          : todo
      )
    );
  };

  const markNotAsDoneAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: false
      }))
    );
  };

  return (
    <div className="todo-container">

      <input
        placeholder="Add a task"
        value={newTodo}
        onChange={updateTaskValue}
        onKeyDown={handleKeyDown}
      />

      <br /><br />

      <button onClick={addNewTask}>
        Add Task
      </button>

      <br /><br /><br />
      <hr />

      <h4>Tasks Todo</h4>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>

            <span className={`todo-text ${todo.isDone ? "completed" : ""}`}>
              {todo.task}
            </span>

            <div className="btn-group">

              <button onClick={() => upperCaseOne(todo.id)}>
                Uppercase It
              </button>

              <button onClick={() => markAsDone(todo.id)}>
                Mark Done
              </button>

              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>

            </div>

          </li>
        ))}
      </ul>

      <br /><br />

      <button onClick={upperCaseAll}>
        Upper Case All
      </button>

      <br /><br />

      <button onClick={lowerCaseAll}>
        Lower Case All
      </button>

      <br /><br />

      <button onClick={markNotAsDoneAll}>
        Mark Not As Done All
      </button>

    </div>
  );
}