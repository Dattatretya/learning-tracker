import "./main.css" 
import Todo from '../Cards/Todo'
import Topics from '../Cards/Topics'
import Notes from '../Cards/Notes'
import Progress from "../Cards/Progress"
import {useNavigate} from "react-router-dom"

const Main = () => {
  const navigate = useNavigate()
  return (
    <>
    <div>
        <div></div>
        <div>
            <span>Profile name</span>
        </div>
        <div>
          <button onClick={()=>navigate("/") }>Logout</button>
        </div>
    </div>
    <div className='flex-view-main'>
        <Todo/>
        <Topics/>
        {/* <Notes/>
        <Progress/> */}
    </div>
    </>
  )
}

export default Main