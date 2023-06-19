import React , {useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePracticesContext } from "../hooks/usePracticesContext"
import PracticeForm from '../components/PracticeForm'
import PracticeDetails from '../components/PracticeDetails'

function MyPractices() {
    
    const {practices, dispatch} = usePracticesContext()
    const { user } = useAuthContext()
    

    useEffect(() => {
        const fetchPractices = async () => {
        const response = await fetch('https://rcdso-backend.onrender.com/api/practices' , {
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_PRACTICES', payload: json})
        }
        }
        
        if(user){
        fetchPractices()
        }
        
    },[dispatch , user])


    return (
        <div className='myPractice-home'>
            <div className='practices'>
                {practices.length==0 ?
                    <div className='no-practice'>
                        <h2>NO</h2>
                        <h1>Practice Added</h1>
                    </div>
                    : ""
                }

                {practices && practices.map((current) => (
                    <PracticeDetails key={current._id} current={current}  />
                ))}
            </div>
            <PracticeForm  />
        </div>
    )
}

export default MyPractices
