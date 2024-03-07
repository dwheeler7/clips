import { useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

export default function SignUp({ setUser }) {
  
    return (
        <>
        <SignUpForm setUser={setUser} />
        </>
      
    )
  }