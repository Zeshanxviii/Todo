import { createContext , useContext } from "react";

const TodoContext = createContext({
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
    UpdateTodo: () => {},
    toggleTodo: () => {}
})


export const TodoProvider = TodoContext.Provider

export const useTodo = () => useContext(TodoContext)