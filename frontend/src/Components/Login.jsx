import "./login.css"
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loginMessage, setLoginMessage] = useState("")

    const navigate = useNavigate();

    const onSubmit = async () =>{
        
        const apiCall = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
            userId: userName,
            password: password
        })
        console.log(apiCall)
        const res = await apiCall.data;

        setLoginMessage(res.message)

        if (res.status==="success"){
            navigate("/home")
        }
    }
 
  return (
    <div className="login-card">
        <div className="username">
            <label className="login-label">Username</label>
            <input onChange={(e)=>setUserName(e.target.value)} />
        </div>
        <div className="password">
            <input onChange={(e)=> setPassword(e.target.value)} type='password' />
            <label className="login-label">Password</label>
        </div>
        <button className="submit" onClick={onSubmit}>Submit</button>

        <div>{loginMessage}</div>
    </div>
  )
}

export default Login