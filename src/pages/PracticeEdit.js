import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCounterContext } from "../hooks/useCounterContext"
import { Link } from 'react-router-dom'
import { useNavigate, useParams , Navigate} from "react-router-dom";

function PracticeEdit() {

    let history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
    const { counter, dispatch } = useCounterContext()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [price, setPrice] = useState("")
    const [production, setProduction] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [description, setDescription] = useState("")
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const [editPractice, setEditPractice] = useState(null)


    // useEffect(()=>{
    //     dispatch({ type: "INCREMENT"})
    //     console.log(counter)
    // },[])
    


    useEffect(() => {
        const fetchPractices = async () => {
        const response = await fetch(`https://rcdso-backend.onrender.com/api/practices/${id}` , {
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        // console.log(json)

        if(response.ok){
            setEditPractice(json)
            // console.log(editPractice)
            // setName(editPractice.name)
            // console.log(name)
            // setLocation(editPractice.location)
            // setAddress(editPractice.address)
            // setEmail(editPractice.email)
            // setWebsite(editPractice.website)
            // setPrice(editPractice.price)
            // setProduction(editPractice.production)
            // setPhoneNo(editPractice.phoneNo)
            // setDescription(editPractice.description)
        }
        }
        
        if(user){
        fetchPractices()
        }
        
    },[user])

    useEffect(()=>{
        if(editPractice){
            setName(editPractice.name)
            // console.log(name)
            setLocation(editPractice.location)
            setAddress(editPractice.address)
            setEmail(editPractice.email)
            setWebsite(editPractice.website)
            setPrice(editPractice.price)
            setProduction(editPractice.production)
            setPhoneNo(editPractice.phoneNo)
            setDescription(editPractice.description)
        }
    },[editPractice])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const practice = {name, location, address, email, website, price, production, phoneNo, description}

        const response = await fetch(`https://rcdso-backend.onrender.com/api/practices/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(practice),
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
            history('/mypractice')
            alert('Your practice has been updated successfully');
            history.push('/')
            
        }
    }




    return (
        <div className='edit-form'>
            <form className='create' onSubmit={handleSubmit}>
                <h3>Update My Practice</h3>

                <label>Practice Name:</label>
                <input 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    // className={emptyFields.includes('name') ? 'error' : ''}
                />

                <label>Location:</label>
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

                <label>Price:</label>
                <input 
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    // className={emptyFields.includes('price') ? 'error' : ''}
                />

                <label>Production:</label>
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

                <label>description:</label>
                <textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='desc-text'
                />

                <button>Update Practice</button>
                {error && <div className="error">{error}</div>}
            </form>
            <Link smooth to="/mypractice">
                <div className='back-btn'>Go Back</div>
            </Link>
            
        </div>
    )
}

export default PracticeEdit
