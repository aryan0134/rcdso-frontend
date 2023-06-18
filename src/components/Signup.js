import React, { useState,useRef } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'
import avatar from './avatar.png'

function Signup() {

    let navigate = useNavigate()
    const upload = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstName, lastName, profilePic, email, password)
    }
    const navigateToLogin = () =>{
        navigate('/login')
    }

    const navigateToHome = () => {
        navigate('/')
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
        <div className='login-bg'>
            <div className='auth-handle edit1'>
                <form className='signup' onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className='profilepic'><img src={profilePic || avatar} /></div>
                    {!profilePic ? <><input
                        type="file"
                        onChange={handleChange}
                        // value={profilePic}
                        ref={upload}
                        style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn'>Upload Profile Pic</button></>
                    : <><input
                    type="file"
                    onChange={handleChange}
                    // value={profilePic}
                    ref={upload}
                    style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn'>Change Profile Pic</button></>
                    }
                    <label>First Name:</label>
                    <input
                        type="text"
                        onChange={(e)=>setFirstName(e.target.value)}
                        value={firstName} 
                    />

                    <label>Last Name:</label>
                    <input
                        type="text"
                        onChange={(e)=>setLastName(e.target.value)}
                        value={lastName} 
                    />

                    

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email} 
                    />

                    <label>Password:</label>
                    <input 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />

                    <button disabled={isLoading}>Sign Up</button>
                    {error && <div className="error">{error}</div>}
                </form>
                <div className='create-auth edit2'>
                    <h1>Already Have an Account</h1>
                    <div className='line'></div>
                    <div className='create-btn' onClick={navigateToLogin} >Log In</div>
                    <h2>Or</h2>
                    <div className='guest' onClick={navigateToHome} >Continue as a Guest</div>
                </div>
            </div>
        </div>
    )
}

export default Signup