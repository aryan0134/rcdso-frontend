import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../hooks/useAuthContext'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
const {format} = require('date-fns');


function SaleYourPractice() {

  const [allPractices, setAllPractices] = useState([])
  const { user } = useAuthContext()
  const [dropDown, setDropDown] = useState(null)

  useEffect(() => {
    const fetchPractices = async () => {
    const response = await fetch('/api/allpractices')
    const json = await response.json()

    if(response.ok){
        setAllPractices(json)
        console.log(json)
        console.log(allPractices)
    }
    }
    
    fetchPractices()
    
    
},[])

const drop = (id)=>{
  setDropDown(id)
}

// useEffect(() =>{
//   setPractice(json)
// },[])

  let history = useNavigate();

  const handleClick = ()=>{
      if(user){
        history('/mypractice')
      }
      if(!user){
        history('/login')
      }
  }
  return (
    <div className='salepractice-main'>
      <div className='itsheading'>
        <div className='itsheading-text'><h1>These are all the practices that are being sold, to sell your own practice click on the button on right side</h1></div>
        <div className='head-btn' onClick={handleClick}><h1>My Practices</h1></div>
      </div>
      <div className='practice-table'>
        <div className='table-head table-shadow'>
          <div className='head1'><h1>Practice Name</h1></div>
          <div className='head1'><h1>Location</h1></div>
          <div className='head1'><h1>Price</h1></div>
          <div className='head1'><h1>Production</h1></div>
          <div className='head1'><h1>Posted On</h1></div>
        </div>
        { allPractices && allPractices.map( (current) => (
          <>
          <div className='table-head table-body' key={uuidv4}>
            <div className='drop-down' key={uuidv4} onClick={()=> {dropDown!= current._id ? setDropDown(current._id) : setDropDown(null)}}><IoIosArrowDropdownCircle /></div>
            <div className='head1' key={uuidv4}>{current.name}</div>
            <div className='head1' key={uuidv4}>{current.location}</div>
            <div className='head1' key={uuidv4}>${current.price}</div>
            <div className='head1' key={uuidv4}>${current.production}</div>
            <div className='head1' >{format(new Date(current.createdAt),'MMM d , yyyy')}</div>
          </div>
          {dropDown==current._id ? 
            <div className='drop-down-details'>
              <div className='drop1'>{current.phoneNo && <><h1>Contact:</h1> <span>{current.phoneNo}</span></>}</div>
              <div className='drop2'>{current.description}</div>
              <div className='drop1'>{current.address && <><h1>Address:</h1>  <span>{current.address}</span></>}</div>
              <div className='drop1'>{current.email && <><h1>Email:</h1>  <span>{current.email}</span></>}</div>
              <div className='drop1'>{current.website && <><h1>Website:</h1>  <span>{current.website}</span></> }</div>
            </div> : null
          }
          </>
        
        ))}
      </div>
    </div>
  )
}

export default SaleYourPractice
