import { useState } from 'react'
import SignUpForm from '../../SignUpForm/SignUpForm'

export default function SignUp({ setUser }) {
  
    return (
        <>
        <SignUpForm setUser={setUser} />
        </>
      
    )
  }