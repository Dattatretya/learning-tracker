import "./main.css" 
import Todo from '../Cards/Todo'
import Topics from '../Cards/Topics'
import Notes from '../Cards/Notes'
import Progress from "../Cards/Progress"

const Main = () => {
  return (
    <>
    <div>
        <div></div>
        <div>
            <span>Profile name</span>
        </div>
    </div>
    <div className='flex-view-main'>
        <Todo/>
        <Topics/>
        <Notes/>
        <Progress/>
    </div>
    </>
  )
}

export default Main