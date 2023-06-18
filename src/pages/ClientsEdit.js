import React, { useState, useEffect,useRef } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import avatar from '../components/avatar.png'

function ClientsEdit() {

  let history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route.
  const upload = useRef()

  const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("")
    const [dob, setDob] = useState("")
    const [profilePic, setProfilePic] = useState("")
    // const [postedBy, setPostedBy] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const [editClients, setEditClients] = useState(null)

    useEffect(() => {
      const fetchClients = async () => {
      const response = await fetch(`/api/clients/${id}` , {
          headers: {'Authorization': `Bearer ${user.token}`}
      })

      const json = await response.json()

      if(response.ok){
          setEditClients(json)
      }
      }
      
      if(user){
      fetchClients()
      }
      
  },[user])

  useEffect(()=>{
    if(editClients){
        setFirstName(editClients.firstName)
        // console.log(name)
        setLastName(editClients.lastName)
        setRole(editClients.role)
        setDob(editClients.dob)
        setProfilePic(editClients.profilePic)
        setDescription(editClients.description)
    }
},[editClients])

const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
        setError("You must be logged in")
        return
    }


    const clients = {firstName, lastName, role, dob, profilePic, description}

    const response = await fetch(`/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(clients),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    if(!response.ok){
        alert("Something went wrong")
    }

    if(response.ok){
        history('/myposts')
        alert('Your practice has been updated successfully');
        history.push('/')
        
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
    <div className='edit-form'>
      <form className='create my-practice-form my-client-form'  onSubmit={handleSubmit}>
            <h3>Update the Client/Employee</h3>

            <div className='profilepic clientpic'><img src={profilePic || avatar} /></div>
                    {!profilePic ? <><input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        // value={profilePic}
                        ref={upload}
                        style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn upload-btn2'>Upload Client/Employee Pic</button></>
                    : <><input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    // value={profilePic}
                    ref={upload}
                    style={{ display: 'none' }}
                    />
                    <button onClick={(e)=> {e.preventDefault(); upload.current.click();}}className='upload-btn upload-btn2'>Change Client/Employee Pic</button></>
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

            <button>Update Client/Employee</button>
            {error && <div className="error">{error}</div>}
        </form>
        <Link smooth to="/myposts">
            <div className='back-btn'>Go Back</div>
        </Link>
    </div>
  )
}

export default ClientsEdit