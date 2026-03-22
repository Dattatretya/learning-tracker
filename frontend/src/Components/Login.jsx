import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () =>{
        const loginCreds = {
            userName,
            password
        }
        const apiCall = await axios.post("/", {
            loginCreds
        })
        const res = await apiCall.data;
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
    </div>
  )
}

export default Login