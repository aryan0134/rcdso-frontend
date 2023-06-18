import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCounterContext } from '../hooks/useCounterContext'

function ClientsAuth() {

    const [code,setCode] = useState("")
    const [error,setError] = useState("")
    const history = useNavigate()
    const { counter,dispatch } = useCounterContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(code == "1840"){
            alert("Authorized User - Access Granted")
            history('/clients')
            dispatch({ type: "INCREMENT"})
            
        }
        else{
            setError("Unauthorized User - Access Denied")
        }
    }

    return (
        <div className='clients-auth-main'>
            <form onSubmit={handleSubmit}>
                <label>Enter the Authorization Code :</label>
                <input 
                    type='password'
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                />
                <button>AUTHENTICATE</button>
                {error && <div className='client-error'>{error}</div>}
            </form>
        </div>
    )
}

export default ClientsAuth