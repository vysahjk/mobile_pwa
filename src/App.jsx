import React, { useEffect, useState } from 'react'
import { todoApi } from './api'

function App() {
  const refTodoName = React.createRef(null)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    (async () => {
      const todos = await todoApi()
      setTodos(todos)
    })()
  }, [])

  const addTodo = () => {
    const todo = refTodoName?.current?.value
    setTodos(prev => {
      let old = Array.from(prev)
      old.unshift({ id: todo.length + 1, name: todo })
      return old
    })
  }

  return (
    <div className="App">
      <p>ToDo List</p>
      <div>
        <input ref={refTodoName} />
        <button onClick={addTodo}>Add</button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div>
          {
            todos.map(item => {
              return (
                <ul key={item.id}>
                  <li>{item.name}</li>
                </ul>
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default App
