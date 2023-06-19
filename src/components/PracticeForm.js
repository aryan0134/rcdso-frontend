import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePracticesContext } from "../hooks/usePracticesContext"


function PracticeForm() {

    const { dispatch } = usePracticesContext()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [price, setPrice] = useState("")
    const [production, setProduction] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const practice = {name, location, address, email, website, price, production, phoneNo, description}

        const response = await fetch('https://rcdso-backend.onrender.com/api/practices/', {
            method: 'POST',
            body: JSON.stringify(practice),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setName("")
            setLocation("")
            setAddress("")
            setEmail("")
            setWebsite("")
            setPrice("")
            setProduction("")
            setPhoneNo("")
            setDescription("")
            setEmptyFields([])
            setError(null)
            console.log('New Practice Added ',json)
            dispatch({type: 'CREATE_PRACTICE', payload: json})
        }
    }


    return (
        <form className='create my-practice-form' onSubmit={handleSubmit}>
            <h3>Add a New Practice</h3>

            <label>Practice Name: *</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                // className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Location(City): *</label>
            <input 
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                // className={ emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Address:</label>
            <input 
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />

            <label>Email:</label>
            <input 
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Website:</label>
            <input 
                type="text"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
            />

            <label>Price: *</label>
            <input 
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                // className={emptyFields.includes('price') ? 'error' : ''}
            />

            <label>Production: *</label>
            <input 
                type="text"
                onChange={(e) => setProduction(e.target.value)}
                value={production}
                // className={emptyFields.includes('production') ? 'error' : ''}
            />

            <label>Phone Number:</label>
            <input 
                type="text"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
            />

            <label>description: *</label>
            <textarea 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='desc-text text-desc'
            />

            <button>Add Practice</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PracticeForm
