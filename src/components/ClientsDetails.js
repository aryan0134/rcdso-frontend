import React  from 'react'
import {Link} from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {format} from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'
import { useClientsContext } from '../hooks/useClientsContext'
import { useCounterContext } from "../hooks/useCounterContext"
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import avatar from './avatar.png'


function ClientsDetails({current}) { 

    const { dispatch } = useClientsContext()
    const { dispatch: setCounter} = useCounterContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user){
        return
        }

        const response = await fetch('https://rcdso-backend.onrender.com/api/clients/' + current._id , {
        method: 'DELETE',
        headers:{'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
        dispatch({type: 'DELETE_CLIENTS', payload: json})
        }

    }
    const deletePractice = () => {
        const confirmBox = window.confirm(
          "Do you really want to delete "+ current.firstName + " " +current.lastName
        )
        if (confirmBox === true) {
          handleClick()
        }
      }

    return (
        <div className='mypracticeDetails clientDetails'>
            <div className='client-details-top'>
                <div className='client-details-pic'><img src={current.profilePic || avatar} /></div>
                <div className='heading-practice client-details-heading'>{current.firstName} {current.lastName}<Link smooth to={`/myposts/edit/${current._id}`} style={{ textDecoration: 'none', color: 'silver'}}><div className='edit-icon' ><FiEdit /></div></Link><div className='delete-icon' onClick={deletePractice}><BsTrash /></div></div>
            </div>
            <div className='practice2'>
                <div className='prac-left'><h2>Role:</h2><span>{current.role}</span></div>
                <div className='prac-right'><h2>D.O.B:</h2><span>{current.dob}</span></div>
            </div>
            <div className='practice3 practice3e'>
                <p>{current.description}</p>
            </div>
            <div className='practice4'><h2>Posted By:</h2><span>Dr {current.postedBy}</span></div>
            <div className='days-ago'>
                {formatDistanceToNow(new Date(current.createdAt),{addSuffix:true})}
            </div>
        </div>
    )
}

export default ClientsDetails
