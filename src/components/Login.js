import React , {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'

function Login() {

    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    const navigateToSignup = () =>{
        navigate('/signup')
    }

    const navigateToHome = () => {
        navigate('/')
    }

    return (
        <div className='login-bg'>
            <div className='auth-handle'>
                <div className='create-auth'>
                    <h1>Do Not Have an Account</h1>
                    <div className='line'></div>
                    <div className='create-btn' onClick={navigateToSignup} >Create New Account</div>
                    <h2>Or</h2>
                    <div className='guest' onClick={navigateToHome} >Continue as a Guest</div>
                </div>
                <form className='login' onSubmit={handleSubmit}>
                    <h3>Log In</h3>

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email} 
                    />

                    <label>Password:</label>
                    <input 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />

                    <button disabled={isLoading}>Log In</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default Login