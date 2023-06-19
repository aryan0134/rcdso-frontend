import React , {useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useClientsContext } from "../hooks/useClientsContext"
import ClientsForm from '../components/ClientsForm'
import ClientsDetails from '../components/ClientsDetails'

function MyPosts() {

    const {clients, dispatch} = useClientsContext()
    const { user } = useAuthContext()
    

    useEffect(() => {
        const fetchClients = async () => {
        const response = await fetch('https://rcdso-backend.onrender.com/api/clients' , {
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_CLIENTS', payload: json})
        }
        }
        
        if(user){
        fetchClients()
        }
        
    },[dispatch , user])


    return (
        <div className='myPractice-home'>
                <div className='practices'>
                    {clients.length==0 ?
                        <div className='no-practice'>
                            <h2>NO</h2>
                            <h1>Clients Added</h1>
                        </div>
                        : ""
                    }

                    {clients && clients.map((current) => (
                        <ClientsDetails key={current._id} current={current}  />
                    ))}
                </div>
                <ClientsForm  />
            </div>
    )
}

export default MyPosts
