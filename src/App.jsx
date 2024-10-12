import { useState , useEffect } from "react"
import "./App.css"
import { TodoProvider, useTodo } from "./context/todoContext"
import TodoForm from "./components/Todofrom"
import TodoItem from "./components/Todoui"

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((state)=>[{id:Date.now(),...todo},...state])
  }
  const removeTodo = (id) => {
    setTodos((state) => state.filter((t) => t.id !== id))
  }
  const UpdateTodo = (id,todo) => {
    setTodos((state)=> state.map((t) => (t.id === id ? todo : t)))
  }

  const toggleTodo = (id) => {
    setTodos((state) => state.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"))
    if (data && data.length>0) {
      setTodos(data)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos,addTodo,removeTodo,UpdateTodo,toggleTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          <TodoForm/>
        </h1>
        <div className="mb-4">{/* Todo form goes here */}</div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id}
            className="w-full">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
