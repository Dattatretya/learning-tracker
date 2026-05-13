import { useState } from "react"
import "./card.css" 
import axios from "axios"
import { useEffect } from "react"

const Todo = () => {

    const [showInput, setShowInput] = useState(false)
    const [todoInput, setTodoInput] = useState("")
    const [todosList, setTodosList] = useState([])
    const [todoId, setTodoId] = useState([])
    const [reRender, setReRender] = useState(false)
    const [editTitle, setEditTitle] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")

    const addTodo = () => {
        setShowInput(true)
    }

    const submitTodo =async () => {
        console.log(todoInput)
        const sendTodo = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/addtodo`, {
            title: todoInput,
            description: ""
        })
        const res = await sendTodo.data;
        console.log(res)

        setReRender(!reRender)
    }

     const deleteTodo = async () => {
        console.log("todo deleted")
        console.log(todoId)
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/deletetodo`, {
            data:{ids: todoId}
        })

        const deleted = res.data
        console.log(deleted)
        if (deleted.status === "success"){
            setReRender(!reRender)
        }

        }
    
    const editTodo = async () => {

        console.log(editedTitle)
        console.log(todoId)

        if (todoId.length > 1){
            return <div> Please dont select more than one to edit</div>
        }
        
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/edittodo`, { 
            
                id: todoId,
                title: editedTitle

        })
        setReRender(!reRender)
    }

    const addRemoveTodo = (todo) => {
        setTodoId(prev => prev.includes(todo._id)? prev.filter(id => id != todo._id): [...prev, todo._id])
    }

     const fetchTodos = async ()=>{
        try{
            console.log("get called")
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettodo`);
        const todo = res.data;
        console.log(todo)
        setTodosList(todo.todos)
        
        }
        catch(err){
            setTodos([])
        }
        }

    useEffect(()=>{
       fetchTodos()
    },[reRender])

  return (
    <div className='flex-view'>
        <div className="column-view">
            <div className="todos-list">
            {todosList.map((todo)=>(
            <div key={todo._id} className="one-column">
                <input className="todo-checkbox" type="checkbox" onClick={()=>addRemoveTodo(todo)}/>
                <span>{todo.title || todo}</span>
            </div>
            
            ))}
            <div style={{marginTop: "20px"}}>
                <button onClick={deleteTodo}>Delete</button>
            </div>
            <div style={{marginTop: "20px"}}>
                <button onClick={()=>setEditTitle(!editTitle)}>Edit</button>
            </div>
            </div>
            <div className="add-input" >
                {showInput ? <p onClick={()=>setShowInput(!showInput)}>(-)</p>:<p onClick={()=>setShowInput(!showInput)}>(+)</p>}
                {showInput && 
                <div>
                <input onChange={(e)=> setTodoInput(e.target.value)}/>
                <button style={{display:"block", marginTop:"4px"}} onClick={submitTodo}>Add</button>
                </div>
                 }
            </div>
            

            {editTitle && 
            <div>
                <input placeholder="click single todo to edit" onChange={(e)=> setEditedTitle(e.target.value)}/>
                <button onClick={editTodo}>Enter</button>
            </div>
                }

            

        </div>
    </div>
  )
}

export default Todo