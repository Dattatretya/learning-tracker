import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./app.css" 
import Login from './Components/Login'
import Main from "./Components/Main"

function App() {

  return (
    <div className="main-card">
    <Routes>
    <Route Component={Login} path="/"/>
    <Route Component={Main} path="/home"/>
    </Routes>
    </div>
  )
}

export default App
