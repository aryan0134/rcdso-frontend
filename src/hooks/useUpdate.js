import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch,user } = useAuthContext()
    const history = useNavigate()

    const update = async (firstName,lastName,profilePic,email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`https://rcdso-backend.onrender.com/api/user/${user.user._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName,lastName,profilePic,email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            alert("Something went wrong")
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            alert('Your Account Details has been updated successfully');
            history('/')
        }
    }

    return { update, isLoading, error }
}
