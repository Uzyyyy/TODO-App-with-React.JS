import { useState, useEffect } from "react"
import Todoinput from "./components/Todoinput"
import Todolist from "./components/Todolist"
function App() {
 
const [todos,setTodos] = useState([])
const [todovalue,settodovalue] = useState("")
const [editingIndex, setEditingIndex] = useState(null)

function persistData(newList){
  localStorage.setItem("todos",JSON.stringify({todos:newList}))
}

function handleAddTodos(newTodo) {
  if (editingIndex !== null) {
    const updatedTodos = [...todos]
    updatedTodos[editingIndex] = newTodo
    persistData(updatedTodos)
    setTodos(updatedTodos)
    setEditingIndex(null) // reset editing state
  } else {
    const newTodolist = [...todos, newTodo]
    persistData(newTodolist)
    setTodos(newTodolist)
  }
  settodovalue("") // clear input after add/edit
}

function handleDeleteTodos(index){
const newTodolist = todos.filter((todo,todoIndex) => {
  return todoIndex !== index
})
persistData(newTodolist)
setTodos(newTodolist)}

function handleEditTodos(index) {
  settodovalue(todos[index])
  setEditingIndex(index)
}

useEffect(() => {
if (!localStorage){
  return
}
let localTodos = localStorage.getItem('todos')
if(!localTodos){
  return
}
localTodos = JSON.parse(localTodos).todos
setTodos(localTodos)
},[])


  return (
    <>
      <Todoinput todovalue={todovalue} settodovalue={settodovalue} handleAddTodos = {handleAddTodos}/>
      <Todolist handleEditTodos = {handleEditTodos} handleDeleteTodos = {handleDeleteTodos} todos={todos}/>
    </>
  )
}

export default App
