import React  from 'react'
import {Link} from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {format} from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePracticesContext } from '../hooks/usePracticesContext'
import { useCounterContext } from "../hooks/useCounterContext"
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'


function PracticeDetails({current}) { 

    const { dispatch } = usePracticesContext()
    const { dispatch: setCounter} = useCounterContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user){
        return
        }

        const response = await fetch('https://rcdso-backend.onrender.com/api/practices/' + current._id , {
        method: 'DELETE',
        headers:{'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
        dispatch({type: 'DELETE_PRACTICE', payload: json})
        }

    }
    const deletePractice = () => {
        const confirmBox = window.confirm(
          "Do you really want to delete "+ current.name
        )
        if (confirmBox === true) {
          handleClick()
        }
      }

    return (
        <div className='mypracticeDetails'>
            <div className='heading-practice'>{current.name}<Link smooth to={`/mypractice/edit/${current._id}`} style={{ textDecoration: 'none', color: 'silver'}}><div className='edit-icon' ><FiEdit /></div></Link><div className='delete-icon' onClick={deletePractice}><BsTrash /></div></div>
            <div className='practice2'>
                <div className='prac-left'><h2>Location:</h2><span>{current.location}</span></div>
                <div className='prac-right'><h2>Website:</h2><span>{current.website ? current.website : 'Not Available'}</span></div>
            </div>
            <div className='practice2'>
                <div className='prac-left'><h2>Email:</h2><span>{current.email ? current.email : 'Not Available'}</span></div>
                <div className='prac-right'><h2>Phone No:</h2><span>{current.phoneNo ? current.phoneNo : 'Not Available'}</span></div>
            </div>
            <div className='practice2'>
                <div className='prac-left'><h2>Price:</h2><span>${current.price}</span></div>
                <div className='prac-right'><h2>Production:</h2><span>${current.production}</span></div>
            </div>
            <div className='practice2'>
                <div className='prac-left'><h2>Address:</h2><span>{current.address ? current.address : 'Not Available'}</span></div>
                <div className='prac-right'><h2>Date:</h2><span>{format(new Date(current.createdAt),'MMM d , yyyy')}</span></div>
            </div>
            <div className='practice3'>
                <p>{current.description}</p>
            </div>
            <div className='days-ago'>
                {formatDistanceToNow(new Date(current.createdAt),{addSuffix:true})}
            </div>
        </div>
    )
}

export default PracticeDetails
