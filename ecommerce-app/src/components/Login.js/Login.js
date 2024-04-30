import React, { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import './Login.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Login = ({setShowLogin}) => {

  const [currentState, setCurrentState] = useState('Login')
  const [data, setData] = useState({
    name:'',
    email:'',
    password:''
  })
  const [error, setError] = useState({
    emailError:'',
    passwordError:''
  })
  
  const {url, token, setToken} = useContext(StoreContext);


  const onLogin = async (e)=>{
        e.preventDefault();
        let requiredUrl = url;
        if(currentState==='Login'){
          requiredUrl+='/api/user/login';
        }else{
          requiredUrl+='/api/user/register';
        }
        //console.log(requiredUrl)

        const response = await axios.post(requiredUrl,data);
        if(response.data.success){
          if(requiredUrl===url+'/api/user/register') toast.success('Registration successful!')
          else toast.success('Login successful!')
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('email',data.email)
            setShowLogin(false)
            setError(data=>({emailError:'',passwordError:''}))
        }
        else{
          console.log(response.data.message.errormsg)
          let errorLabel = response.data.message.label;
          if(errorLabel==='email'){
            setError(data=>({...data, emailError:response.data.message.errormsg}))
          }
          else if(errorLabel==='password'){
            setError(data=>({errormsg:'', passwordError:response.data.message.errormsg}))
          }
          else
          toast.error(response.data.message.errormsg)
        }
  }




  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  return (
    <div className='login-popup'>
        <form className='login-container' onSubmit={onLogin}>
            <div className='login-form-title'>
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src='Images/HomePage/cross_icon.png' alt='cross'/>
            </div>
            <div>
              {
                currentState === 'Sign Up' && <div className='login-inputs'><label>Name</label><input type='text' placeholder='Your name' onChange={(e)=>setData(data=>({...data,name:e.target.value}))} value={data.name} required/></div>
              }
              <div className='login-inputs'><label>E-mail Id</label>
              <input type='email' placeholder='Your email' onChange={(e)=>setData(data=>({...data,email:e.target.value}))} value={data.email}  required/></div>
              <div className='error'>{error.emailError ? error.emailError : null}</div>
              <div className='login-inputs'><label>Password</label>
              <input type='password' placeholder='Your password' onChange={(e)=>setData(data=>({...data,password:e.target.value}))} value={data.password}  required/></div>
              <div className='error'>{error.passwordError ? error.passwordError : null}</div>
            </div>
            <button type='submit'>{currentState==='Sign Up' ? "Create account" : "Login"}</button>
            
           {currentState!=='Login' && <div className='login-popup-condition'>
              <input type='checkbox' required/>
              <p>I agree to the terms of use & privacy policy.</p>
            </div>}
            {currentState==='Login' ? <p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>}
        </form>
      
    </div>
  )
}

export default Login
