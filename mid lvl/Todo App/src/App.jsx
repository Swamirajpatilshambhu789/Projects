// import React, { useState, useEffect } from 'react';
// import header from './assets/Image/Header.png';
// import { v4 as uuidv4 } from 'uuid';
// import './App.css';

// function App() {
//   const [ntodo, setntodo] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editedTodoName, setEditedTodoName] = useState('');
//   const [Todos, setTodos] = useState([]);

//   useEffect(() => {
//     let Stringstore = localStorage.getItem("todos");
//     if (Stringstore) {
//       let Todos = JSON.parse(localStorage.getItem("todos"));
//       setTodos(Todos);
//     }
//   }, []);

//   const savetols() = () => {
//     localStorage.setItem("todos", JSON.stringify(Todos));
//     console.log("Todos saved to localStorage:", Todos);
//   };

//   const Handelinp = (e) => {
//     setntodo(e.target.value);
//   };
  
//   const HandelAdd = () => {
//     if (ntodo) {
//       setTodos([...Todos, { id: uuidv4(), name: ntodo, isComplete: false }]);
//       setntodo('');
//       // console.log("New todo added:", Todos);
//       savetols()(); // Call savetols() to save changes to localStorage
//     }
//     // savetols()();
//   };

//   const Handelcheakbox = (id) => {
//     let it = Todos.findIndex(item => item.id == id);
//     let newtodos = [...Todos];
//     newtodos[it].isComplete = !newtodos[it].isComplete;
//     setTodos(newtodos);
//     savetols()(); // Call savetols() to save changes to localStorage
//     console.log("Todo checked/unchecked:", Todos);
//   };

//   const HandelDelete = async (id) => {
//     let it = Todos.findIndex(item => item.id == id);
//     let newtodos = Todos.filter(item => item.id !== id);
//     setTodos(newtodos);
//     savetols()(); // Call savetols() to save changes to localStorage
//     console.log("Todo deleted:", Todos);
//     savetols()();
//   };

//   const handleEdit = (id, name) => {
//     setEditingId(id);
//     setEditedTodoName(name);
//   };

//   const handleSaveEdit = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, name: editedTodoName } : todo
//       )
//     );
//     setEditingId(null);
//     setEditedTodoName('');
//     savetols()(); // Call savetols() to save changes to localStorage
//     console.log("Todo edited:", Todos);
//   };

//   return (
//     <>
//       <div className="head">
//         <img className="headimg" src={header} alt="" />
//       </div>
//       <div className="main">
//         <div className="mainhead">Todos</div>
//         <div className="todo">
//           <div className="add">
//             <div className="fill">
//               <div className="att">Add todo</div>
//               <input
//                 onChange={Handelinp}
//                 value={ntodo}
//                 type="text"
//                 name="todo"
//                 className="addtodo"
//               />
//             </div>
//             <button onClick={HandelAdd} className="addb">
//               Add
//             </button>
//           </div>
//           {Todos.map((item) => (
//             <div key={item.id} className="display">
//               <div className="done">
//                 <div className="showon"></div>
//                 <div className="finishedtodos"></div>
//               </div>
//               <div className="todo">
//                 <div className="todocompo">
//                   <div className="don">
//                     <input
//                       name={item.id}
//                       onChange={() => Handelcheakbox(item.id)}
//                       type="checkbox"
//                       checked={item.isComplete}
//                     />
//                   </div>
//                   {editingId === item.id ? (
//                     <div className="optionse">
//                       <input
//                         type="text"
//                         value={editedTodoName}
//                         onChange={(e) => setEditedTodoName(e.target.value)}
//                         className='edittodo'
//                       />
//                       <button className='btc' onClick={() => handleSaveEdit(item.id)}>
//                         Save
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className={`name ${item.isComplete ? 'done' : ''}`}>
//                         {item.name}
//                       </div>
//                       <div className="options">
//                         <button
//                           onClick={() => handleEdit(item.id, item.name)}
//                           className="btc edit"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => HandelDelete(item.id)}
//                           className="btc delete"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import header from './assets/Image/Header.png';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [ntodo, setntodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTodoName, setEditedTodoName] = useState('');
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    let Stringstore = localStorage.getItem("todos")
    if(Stringstore){
      let Todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(Todos)
    }
  }, [])
  

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(Todos))
    
  }

  const Handelinp = (e) => {
    setntodo(e.target.value);
  };
  
  const HandelAdd = () => {
    if (ntodo.trim() !== '') {
      setTodos([...Todos, { id: uuidv4(), name: ntodo, isComplete: false }]);
      setntodo('');
    }
    savetols
  };

  const Handelcheakbox = (id) => {
    let it = Todos.findIndex(item => {
      return item.id == id
    })
    let newtodos = [...Todos]
    newtodos[it].isComplete = !newtodos[it].isComplete
    setTodos(newtodos)
    savetols()
  };

  const HandelDelete = (id) => {
    try {
        let newtodos = Todos.filter(item => item.id !== id);
        console.log("Filtered Todos:", newtodos); // Log filtered todos
        setTodos(newtodos);
        savetols(); // Assuming this function saves the updated todos
        console.log(Todos);
        // localStorage.clear()
    } catch (error) {
        console.error("Error in HandelDelete:", error);
    }
};


  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditedTodoName(name);
  };

  const handleSaveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: editedTodoName } : todo
      )
    );
    setEditingId(null);
    setEditedTodoName('');
    savetols()
  };


  return (
    <>
      <div className="head">
        <img className="headimg" src={header} alt="" />
      </div>
      <div className="main">
        <div className="mainhead">Todos</div>
        <div className="todo">
          <div className="add">
            <div className="fill">
              <div className="att">Add todo</div>
              <input
                onChange={Handelinp}
                value={ntodo}
                type="text"
                name="todo"
                className="addtodo"
              />
            </div>
            <button onClick={HandelAdd} className="addb">
              Add
            </button>
          </div>
          {Todos.map((item) => (
            <div key={item.id} className="display">
              <div className="done">
                <div className="showon"></div>
                <div className="finishedtodos"></div>
              </div>
              <div className="todo">
                <div className="todocompo">
                  <div className="don">
                    <input
                      name={item.id}
                      onChange={() => Handelcheakbox(item.id)}
                      type="checkbox"
                      checked={item.isComplete}
                    />
                  </div>
                  {editingId === item.id ? (
                    <div className="optionse">
                      <input
                        type="text"
                        value={editedTodoName}
                        onChange={(e) => setEditedTodoName(e.target.value)}
                        className='edittodo'
                      />
                      <button className='btc' onClick={() => handleSaveEdit(item.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={`name ${item.isComplete ? 'done' : ''}`}>
                        {item.name}
                      </div>
                      <div className="options">
                        <button
                          onClick={() => handleEdit(item.id, item.name)}
                          className="btc edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => HandelDelete(item.id)}
                          className="btc delete"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;