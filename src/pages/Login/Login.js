import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'


export default function Login({ setUser }) {    
    return (
        <>        
        <LoginForm setUser={setUser}/>
        
        </>
      
    )
  }