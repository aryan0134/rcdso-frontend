import React, { useState,useRef, useEffect } from 'react'
import avatar from '../components/avatar.png'
import { useNavigate} from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { useUpdate } from '../hooks/useUpdate'
import {AiFillLock} from 'react-icons/ai'

function AccountDetails() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useAuthContext()
    let history = useNavigate();
    const upload = useRef()
    const { update, error, isLoading} = useUpdate()

    useEffect(() => {
        console.log(profilePic)
        setFirstName(user.user.firstName)
        setLastName(user.user.lastName)
        setProfilePic(user.user.profilePic)
        setEmail(user.user.email)
        setPassword(user.user.password)
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault()

        await update(firstName, lastName, profilePic, email, password)

    }

    function handleChange(event) {
        event.preventDefault()
        // console.log(event.target.files);
        // setProfilePic(event.target.files[0]);
        // console.log(profilePic)
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePic(reader.result);
            };
        }
        // console.log(profilePic)
    }
  return (
    <div className='login-bg'>
        <form className='signup' id="my-form" onSubmit={handleSubmit}>
                        <h3>My Account Details</h3>

                        <div className='profilepic'><img src={profilePic || avatar} /></div>
                        {!profilePic ? <><input
                            type="file"
                            onChange={handleChange}
                            // value={profilePic}
                            ref={upload}
                            form="my-form"
                            style={{ display: 'none' }}
                        />
                        <button onClick={(e)=> {e.preventDefault(); upload.current.click();}} id="my-form" className='upload-btn'>Upload Profile Pic</button></>
                        : <><input
                        type="file"
                        onChange={handleChange}
                        // value={profilePic}
                        ref={upload}
                        form="my-form"
                        style={{ display: 'none' }}
                        />
                        <button onClick={(e)=> {e.preventDefault(); upload.current.click();}} id="my-form" className='upload-btn'>Change Profile Pic</button></>
                        }
                        <label>First Name:</label>
                        <input
                            type="text"
                            onChange={(event)=>setFirstName(event.target.value)}
                            value={firstName} 
                        />

                        <label>Last Name:</label>
                        <input
                            type="text"
                            onChange={(event)=>setLastName(event.target.value)}
                            value={lastName} 
                        />

                        

                        <label>Email: <AiFillLock /></label>
                        <input
                            type="email"
                            // onChange={(event)=>setEmail(event.target.value)}
                            value={email}
                            style={{backgroundColor:'gray'}} 
                        />

                        <label>Password:</label>
                        <input 
                            type="password"
                            onChange={(event)=>setPassword(event.target.value)}
                            value={password}
                        />

                        <button >Update My Account</button>
                        {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}

export default AccountDetails