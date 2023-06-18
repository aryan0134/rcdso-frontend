import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogsContext } from "../hooks/useBlogsContext"
import {useNavigate} from 'react-router-dom'

function CreateBlogs() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [emptyFields, setEmptyFields] = useState([])
    const [error,setError] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useBlogsContext()
    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const postedBy = `${user.user.firstName} ${user.user.lastName}`

        const blog = {title,content,postedBy}

        const response = await fetch('/api/blogs/', {
            method: 'POST',
            body: JSON.stringify(blog),
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
            setTitle("")
            setContent("")
            setEmptyFields([])
            setError(null)
            console.log('New Blog Added ',json)
            dispatch({type: 'CREATE_BLOGS', payload: json})
            alert("Your Blog has been Uploaded successfully")
        }
    }
    const navigating= ()=>{
        if(user){
            history('/myblogs')
        }
        else{
            history('/login')
        }
    }


    return (
        <div className='blog-create-main'>
            <button onClick={navigating} className='navigate-btn'>My Blogs</button>
            <form onSubmit={handleSubmit}>
                <h3>Create Your Own Blog</h3>

                <label>Your Title:</label>
                <input 
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Your Content:</label>
                <textarea 
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className={emptyFields.includes('content') ? 'error' : ''}
                />
                <button>CREATE</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default CreateBlogs