import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import avatar from './avatar.png'
import {IoMdArrowDropdown} from 'react-icons/io'
import {IoMdArrowDropup} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import dentaledge from './dentaledge.png'

function Navbar() {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const history = useNavigate()

  const [data,setData]= useState(0)

  const handleClick = () => {
    logout()
    history('/')
    // console.log(user)
  }
  const handleAccount = () => {
    history('/accountdetails')
    setData(0)
  }

  const dropdown = ()=> {
    if(data==1){
      setData(0)
    }
    else{
      setData(1)
    }
  }

  return (
    <header>
        <div className='header-logo'>
          <div className='nav-logo'>
            <img src={dentaledge}/>
          </div>
          <nav>
            {user && (<div className='log-flex'>
                <div className='btn-loggedin'>
                  <div className='loggedin-img'><img src={user.user.profilePic || avatar} /></div>
                  <div className='name-email'>
                    <div className='logged-name'><h3>{user.user.firstName} {user.user.lastName}</h3></div>
                    <div className='logged-name'><h3>{user.email}</h3></div>
                  </div>
                  <div className='loggedin-drop' onClick={dropdown}>{data==0 ? <IoMdArrowDropdown/> : <IoMdArrowDropup />}</div>
                </div>
                {data==1 ?
                <div className='dropdown-menu'>
                  <div className='account-details' onClick={handleAccount}>My Account Details</div>
                  <div className='account-details' onClick={handleClick}>Logout</div>
                </div> : ""}
            </div>)}
            {!user && (<div className='flexing'>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
            </div>)}
          </nav>
        </div>
        <div className='header-tabs'>
            <ul>
                <Link smooth to='/' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Home</li>
                </Link>
                <Link smooth to='/saleyourpractice' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Sale Your Practice</li>
                </Link>
                <Link smooth to='/clientsauth' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Clients/Employees</li>
                </Link>
                <Link smooth to='/others' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Others</li>
                </Link>
                <Link smooth to='/blogs' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Blogs</li>
                </Link>
                <Link smooth to='/contact' style={{ textDecoration: 'none', color: 'black'}} >
                  <li>Contact Us</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Navbar
