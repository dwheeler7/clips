import { useState } from 'react'
import NewClippingForm from '../../components/NewClippingForm/NewClippingForm'
import { useNavigate } from 'react-router-dom';

export default function NewClip() {
    const navigate = useNavigate();


    return <NewClippingForm navigate={navigate} />
}