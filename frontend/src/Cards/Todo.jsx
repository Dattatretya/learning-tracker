import { useState } from "react"
import "./card.css" 

const Todo = () => {

    const [showInput, setShowInput] = useState(false)

    const addTodo = () => {
        setShowInput(true)
    }

    const removeInput = () => {
        setShowInput(false)
    }

  return (
    <div className='flex-view'>
        <div className="column-view">
            <div>
                <input type="checkbox"/>
                <label>Haha</label>
            </div>
            <div className="" onClick={addTodo}>
                <span> Add todo</span>
                {showInput && 
                <div>
                <input/>
                <span onClick={removeInput}>Naayy</span>
                </div>
                 }
            </div>
        </div>
    </div>
  )
}

export default Todo