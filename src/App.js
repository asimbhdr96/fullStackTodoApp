import React, { useEffect, useState } from "react";

const URL = "http://localhost:4000";
function App() {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  useEffect(() => {
    fetch(`${URL}/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, [todos]);

  const handlePost = () => {
    fetch(`${URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        content: inputTodo,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([
          ...todos,
          {
            id: data.id,
            content: inputTodo,
          },
        ]);
      });
      setInputTodo('')
  };

  const handleDelete = (id) => {
    fetch(`${URL}/todos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      setTodos(prev => {
        return prev.filter((elem) => elem.id !== id)
      });
    });
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      {todos.map((ele, idx) => {
        return (
          <section className='todos' key={idx} id={ele.id}>
            <span>{ele.content}</span>
            <button onClick={() => {handleDelete(ele.id);}}>DELETE</button>
            <EditTodo id={ele.id} setTodos= {setTodos}  />
            <br />
          </section>
        );
      })}
      <div>
      <input value={inputTodo} onChange={(e) => setInputTodo(e.target.value)}/>
      <button onClick={handlePost}>Add</button>
      </div>
    </div>
  );
}

function EditTodo({ setTodos, id}){

  const [inputState, setInputState] = useState("");
  const inputHandler = (event) => {
    setInputState(event.target.value);
  };
  function updateHandler(input, id){

    fetch(`${URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        content: input,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }).then(res => res.json())
    .then(data => {
      setTodos(prev => {
        return prev.map(t => {
          if(t.id === id){
            return {
              ...t,
              content : data.content
            }
          }
          return t;
        })
      })
    })
  };



  return (
    <div className='input__container'>
      <input value={inputState} onChange={inputHandler} />
      <button
        onClick={() => {
          console.log('hello')
          updateHandler(inputState, id);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default App;
