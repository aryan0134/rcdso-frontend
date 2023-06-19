import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { v4 as uuidv4 } from 'uuid';
import avatar from '../components/avatar.png'
import SearchBar from '../components/SearchBar';

function Clients() {

  const history = useNavigate()
  const { user } = useAuthContext()
  const [allClients, setAllClients] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [role,setRole]= useState('')

  const [searchResults, setSearchResults]= useState([])


  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  
  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    setRole(selectedValue);
  };
  
  useEffect(() => {
    const filterClients = (clients, searchTerm, selectedRole) => {
      return clients.filter((current) => {
        const fullName = `${current.firstName} ${current.lastName}`.toLowerCase();
        const searchValue = searchTerm.toLowerCase();
        const roleMatched = selectedRole === "" || current.role === selectedRole;
  
        return fullName.includes(searchValue) && roleMatched;
      });
    };
  
    const filteredClients = filterClients(allClients, searchTerm, role);
    setSearchResults(filteredClients);
  }, [allClients, searchTerm, role]);

  useEffect(() => {
    const fetchClients = async () => {
    const response = await fetch('https://rcdso-backend.onrender.com/api/allclients')
    const json = await response.json()

    if(response.ok){
        setAllClients(json)
        console.log(json)
        console.log(allClients)
    }
    }
    
    fetchClients()
    
    
},[])

  const handleClick = ()=>{
    if(user){
      history('/myposts')
    }
    if(!user){
      history('/login')
    }
  }



  return (
    <div className='salepractice-main clients-main'>
      <div className='itsheading clients-heading'>
        <div className='itsheading-text its-heading-text2'><h1>Search your employee or Patients before hiring or accepting them:</h1></div>
        <div className='head-btn head-btn2' onClick={handleClick}><h1>My Posts</h1></div>
      </div>
      <div className='clients-main-container'>
        <div className='search-bar'>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <form className='client-filter'>
            <select 
                id='role'
                onChange={handleRoleChange}
                value={role}
            >
                <option Value="">Select a Role:</option>
                <option value="client">Client</option>
                <option value="employee">Employee</option>
            </select>
          </form>
        </div>
        { (allClients && searchTerm=="" && role=="") ? allClients.map((arrow)=>(
          <div className='clients-cards-all' key={arrow._id}>
            <div className='clients-cards-details' >
              <div className='card1'><h2>First Name: </h2><span>{arrow.firstName}</span></div>
              <div className='card1'><h2>Last Name: </h2><span>{arrow.lastName}</span></div>
              <div className='card1'><h2>Role: </h2><span>{arrow.role}</span></div>
              <div className='card1'><h2>D.O.B: </h2><span>{arrow.dob}</span></div>
              <div className='card1'><h2>Posted By: </h2><span>Dr {arrow.postedBy}</span></div>
            </div>
            <div className='clients-cards-image' ><img src={arrow.profilePic || avatar}/></div>
            <div className='clients-cards-description'><p>{arrow.description}</p></div>
          </div>
        )) : 
          searchResults.map((arrow) =>(
            <div className='clients-cards-all' key={arrow._id}>
            <div className='clients-cards-details' >
              <div className='card1'><h2>First Name: </h2><span>{arrow.firstName}</span></div>
              <div className='card1'><h2>Last Name: </h2><span>{arrow.lastName}</span></div>
              <div className='card1'><h2>Role: </h2><span>{arrow.role}</span></div>
              <div className='card1'><h2>D.O.B: </h2><span>{arrow.dob}</span></div>
              <div className='card1'><h2>Posted By: </h2><span>Dr {arrow.postedBy}</span></div>
            </div>
            <div className='clients-cards-image' ><img src={arrow.profilePic || avatar}/></div>
            <div className='clients-cards-description'><p>{arrow.description}</p></div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Clients
