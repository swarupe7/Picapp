import React,{useState,useEffect} from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {


  const routerHistory = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    
  
    const [activeForm, setActiveForm] = useState('login');
  
    const handleFormChange = (formType) => {
      setActiveForm(formType);
    };
  
    const handleLoginSubmit = async(e) => {
      e.preventDefault();
      // Handle login submission logic here
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: email,
          password: password,
        });
    
        if (response.status === 200) {
          toast.success('Login success'); 
          localStorage.setItem('token', response.status.toString());
          routerHistory('/upload'); // Successful login, you may want to redirect the user or perform other actions.
        } else {
          toast.error(response.data.message); // Handle login error
        }
      } catch (error) {
       toast.error('Login failed');
      }
   
    };
  
    const handleSignupSubmit = async (e) => {
      e.preventDefault();
      // Handle signup submission logic here

      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          email: email,
          password: password,
        });
    
        if (response.status === 200) {
          toast.success('Signup success'); // Successful signup, you may want to redirect the user or perform other actions.
        } else {
          toast.error(response.data.message); // Handle signup error
        }
      } catch (error) {
        toast.error('Signup failed');
      }


  




    };

    useEffect(()=>{
      if(localStorage.getItem('token') ){
        routerHistory('/upload');
      }
    },[]);

  return (
    <>
    <ToastContainer/>
    <div   className={`wrapper ${activeForm === 'login' ? 'login-form' : 'signup-form'}`}>
      <div className="title-text">
        <div className={`title ${activeForm === 'login' ? 'login' : 'signup'}`}>
          {activeForm === 'login' ? 'Login Form' : 'Signup Form'}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={activeForm === 'login'}
            onChange={() => handleFormChange('login')}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={activeForm === 'signup'}
            onChange={() => handleFormChange('signup')}
          />
          <label htmlFor="login" className={`slide login ${activeForm === 'login' ? 'active' : ''}`}>
            Login
          </label>
          <label htmlFor="signup" className={`slide signup ${activeForm === 'signup' ? 'active' : ''}`}>
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form onSubmit={activeForm === 'login' ? handleLoginSubmit : handleSignupSubmit}  className={`login ${activeForm === 'login' ? 'active' : ''}`}>
            <div className="field">
              <input
                type="text"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="field btn">
              <div className="btn-layer"></div>
              
              <input type="submit" value={activeForm==="login"?"Login":"Signup"} /> 
            </div>

            {
                activeForm==="login" ?

                <div className="signup-link">
              Not a member? <a href="" onClick={(e)=>{e.preventDefault();  setActiveForm('signup')}}>Signup now</a>
            </div>:
            <div className="signup-link">
            Have Account? <a href="" onClick={(e)=>{e.preventDefault(); setActiveForm('login')}}>Login now</a>
          </div>
             


            }
            
          </form>
        
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Login;



  
   
 

