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

    const addTodo = () => {
        setShowInput(true)
    }

    const removeInput = (e) => {
        e.stopPropagation();
        setShowInput(false);
    }

    const submitTodo =async () => {
        console.log(todoInput)
        const sendTodo = await axios.post("http://localhost:8000/api/v1/addtodo", {
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
        const res = await axios.delete("http://localhost:8000/api/v1/deletetodo", {
            data:{ids: todoId}
        })

        const deleted = res.data
        console.log(deleted)
        if (deleted.status === "success"){
            setReRender(!reRender)
        }

        }

     const fetchTodos = async ()=>{
        try{
            console.log("get called")
        const res = await axios.get("http://localhost:8000/api/v1/gettodo");
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
            {todosList.map((todo)=>(
            <div key={todo._id} className="one-column">
                <input type="checkbox" onClick={()=>setTodoId([...todoId, todo._id])}/>
                <p>{todo.title || todo}</p>
            </div>
            ))}
            <div className="" onClick={addTodo}>
                <p> (+) </p>
                {showInput && 
                <div>
                <input onChange={(e)=> setTodoInput(e.target.value)}/>
                <button onClick={submitTodo}>Add</button>
                <p onClick={removeInput}>Nayy</p>
                </div>
                 }
            </div>
            <div>
                <button onClick={deleteTodo}>Delete</button>
            </div>

        </div>
    </div>
  )
}

export default Todo