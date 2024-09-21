import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAdd = () => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    saveToLS(updatedTodos); 
    setTodo("");
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDlt = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const ToggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-purple-300 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-[100vw] md:w-3/4">
        <div className="addTodo flex">
          <h2 className="text-lg font-bold m-2">Add a Todo:</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="rounded-full px-2 w-4/5"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-purple-600 hover:bg-purple-800 px-4 text-sm font-bold text-white rounded-full h-16 w-1/12 mx-4 disabled:bg-purple-950"
          >
            Save
          </button>
        </div>

        <input
          onChange={ToggleFinished}
          className="my-4"
          id="show"
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>

        {/* todo tasks list */}

        <h2 className="text-xl font-bold mt-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between w-2/4 my-5"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      id="todo"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <label
                      htmlFor="todo"
                      className={item.isCompleted ? "line-through" : ""}
                    >
                      {item.todo}
                    </label>
                  </div>

                  <div className="buttons flex gap-9">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-purple-600 hover:bg-purple-900 px-4 py-2 text-xl font-bold text-white rounded-full"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDlt(item.id);
                      }}
                      className="bg-purple-600 hover:bg-purple-900 px-4 py-2 text-xl font-bold text-white rounded-full"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
