import React , {useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogsContext } from "../hooks/useBlogsContext"
import { ImQuotesLeft } from 'react-icons/im'
import { ImQuotesRight } from 'react-icons/im'
import BlogPostItems from '../components/BlogPostItems'

function ViewBlogs() {

    const {blogs, dispatch} = useBlogsContext()
    const { user } = useAuthContext()
    

    useEffect(() => {
        const fetchBlogs = async () => {
        const response = await fetch('/api/allblogs' , {
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


    return (
        <div className='myblogs-main'>
                {blogs && blogs.map((current)=>(
                    <BlogPostItems key={current._id} current={current} postId={current._id} />
                ))}
        </div>
    )
}

export default ViewBlogs