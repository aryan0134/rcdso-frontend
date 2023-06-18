import React from 'react'
import blog1 from './blog1.gif'
import blog2 from './blog2.gif'
import blog from './blog.gif'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Footer from "../components/Footer"

function Blogs() {

  const history = useNavigate()
  const { user } = useAuthContext()

  const navigateToCreate = () => {
    if(user){
      history('/createblogs')
    }
    else{
      history('/login')
    }
  }
  const navigateToView = () => {
    if(user){
      history('/viewblogs')
    }
    else{
      history('/login')
    }
    
  }

  return (
    <>
    <div className='blogs-start'>
      <img src={blog1} className='blog-pic'/>
      <img src={blog} className='pic-blog'/>
      <img src={blog2} className='pic-blog1'/>
      <button className='blog-btn' onClick={navigateToCreate}>Create Your Own Blog's</button>
      <button className='blog-btn blog-btn1' onClick={navigateToView}>View Other's Blog</button>
    </div>
    <Footer />
    </>
  )
}

export default Blogs