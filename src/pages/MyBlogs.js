import React , {useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogsContext } from "../hooks/useBlogsContext"
import { ImQuotesLeft } from 'react-icons/im'
import { ImQuotesRight } from 'react-icons/im'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function MyBlogs() {

    const {blogs, dispatch} = useBlogsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    

    useEffect(() => {
        const fetchBlogs = async () => {
        const response = await fetch('/api/blogs' , {
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_BLOGS', payload: json})
        }
        }
        
        if(user){
        fetchBlogs()
        }
        
    },[dispatch , user])

    const handleClick = async (current) => {

        if(!user){
        return
        }

        const response = await fetch('/api/blogs/' + current._id , {
        method: 'DELETE',
        headers:{'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
        dispatch({type: 'DELETE_BLOGS', payload: json})
        }

    }
    const deletePractice = (current) => {
        const confirmBox = window.confirm(
          "Do you really want to delete "+ current.title
        )
        if (confirmBox === true) {
          handleClick(current)
        }
      }

    return (
        <div className='myblogs-main'>
            {blogs.length == 0 ? <div className='no-practice'>
                        <h2>NO</h2>
                        <h1>Blogs Added</h1>
                    </div>
                    : ""}
            {blogs && blogs.map((current)=>(
                <div className='myblogs-card' key={current._id}>
                    <div className='myblogs-title'>
                       <h1>{current.title}</h1>
                       <h2>By {current.postedBy}</h2> 
                       <div className='icon-edit' onClick={()=> navigate(`/myblogs/edit/${current._id}`)}><FiEdit /></div>
                       <div className='icon-delete'onClick={()=>deletePractice(current)}><BsTrash /></div>
                    </div>
                    <div className='myblogs-content'>
                        <div className='icon-quotes'><ImQuotesLeft /></div>
                        <p>{current.content}</p>
                        <div className='right-bottom'><ImQuotesRight /></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBlogs