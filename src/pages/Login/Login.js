import { useState } from 'react'
import Container from '../../components/Container/Container'
import LoginForm from '../../components/LoginForm/LoginForm'


export default function Login({ setUser }) {    
    return (
        <>
        <Container>
            <LoginForm setUser={setUser}/>
        </Container>
        </>
      
    )
  }