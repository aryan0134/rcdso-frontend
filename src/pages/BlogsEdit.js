import React, { useState, useEffect,useRef } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";

function BlogsEdit() {

    let history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route.

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error,setError] = useState(null)
    const { user } = useAuthContext()
    const [editBlogs, setEditBlogs] = useState(null)

    useEffect(() => {
        const fetchBlogs = async () => {
        const response = await fetch(`/api/blogs/${id}` , {
            headers: {'Authorization': `Bearer ${user.token}`}
        })
  
        const json = await response.json()
  
        if(response.ok){
            setEditBlogs(json)
        }
        }
        
        if(user){
        fetchBlogs()
        }
        
    },[user])
  
    useEffect(()=>{
      if(editBlogs){
          setTitle(editBlogs.title)
          setContent(editBlogs.content)
      }
    },[editBlogs])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }


        const blogs = {title,content}

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(blogs),
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
            history('/myblogs')
            alert('Your practice has been updated successfully');
            history.push('/')
            
        }
    }
    const navigating= ()=>{
        history('/myblogs')
    }

    return (
        <div className='blog-create-main'>
                <button onClick={navigating} className='navigate-btn'>Go Back</button>
                <form onSubmit={handleSubmit}>
                    <h3>Edit Your Own Blog</h3>

                    <label>Your Title:</label>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <label>Your Content:</label>
                    <textarea 
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                    <button>UPDATE</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
    )
}

export default BlogsEdit