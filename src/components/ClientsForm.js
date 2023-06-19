import React, { useState,useRef } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useClientsContext } from "../hooks/useClientsContext"
import avatar from './avatar.png'


function ClientsForm() {

    const { dispatch } = useClientsContext()
    const upload = useRef()
    const myform = useRef()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("")
    const [dob, setDob] = useState("")
    const [profilePic, setProfilePic] = useState("")
    // const [postedBy, setPostedBy] = useState("")
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

        let postedBy=`${user.user.firstName} ${user.user.lastName}`

        const clients = {firstName, lastName, role, dob, postedBy, profilePic, description}

        const response = await fetch('https://rcdso-backend.onrender.com/api/clients', {
            method: 'POST',
            body: JSON.stringify(clients),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log(emptyFields)
        }
        if(response.ok){
            setFirstName("")
            setLastName("")
            setProfilePic("")
            setRole("")
            setDob("")
            // setPostedBy("")
            setDescription("")
            setEmptyFields([])
            setError(null)
            console.log('New Client Added ',json)
            dispatch({type: 'CREATE_CLIENTS', payload: json})
            myform.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function handleChange(e) {
        e.preventDefault()
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePic(reader.result);
            };
        }
    }


    return (
        <form className='create my-practice-form' ref={myform} onSubmit={handleSubmit}>
            <h3>Add a New Client/Employee</h3>

            <div className='profilepic clientpic'><img src={profilePic || avatar} /></div>
                    {!profilePic ? <><input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        // value={profilePic}
                        ref={upload}
                        style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn upload-btn2'>Upload Client Pic</button></>
                    : <><input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    // value={profilePic}
                    ref={upload}
                    style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn upload-btn2'>Change Client Pic</button></>
                    }

            <label>First Name: *</label>
            <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                // className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Last Name: *</label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                // className={ emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Role: *</label>
            <select 
                id='role'
                onChange={(e) => setRole(e.target.value)}
                value={role}
            >
                <option Value="">Select a Role:</option>
                <option value="client">Client</option>
                <option value="employee">Employee</option>
            </select>

            <label>D.O.B: *</label>
            <input 
                type="text"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
            />

            <label>description: *</label>
            <textarea 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='desc-text text-desc'
            />

            <button>Add Client/Employee</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ClientsForm
