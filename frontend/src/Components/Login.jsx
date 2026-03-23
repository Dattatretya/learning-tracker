import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loginMessage, setLoginMessage] = useState("")

    const onSubmit = async () =>{
        
        const apiCall = await axios.post("http://localhost:8000/api/v1/login", {
            userId: userName,
            password: password
        })
        console.log(apiCall)
        const res = await apiCall.data;

        setLoginMessage(res.message)
    }
 
  return (
    <div className="homepage">
        <div>
            <label className='username'>Username</label>
            <input onChange={(e)=>setUserName(e.target.value)} placeholder='username'/>
        </div>
        <div>
            <label >Password</label>
            <input onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='password'/>
        </div>
        <button onClick={onSubmit}>Submit</button>

        <div>{loginMessage}</div>
    </div>
  )
}

export default Login