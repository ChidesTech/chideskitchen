import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../redux-actions/userActions';
import Popup from '../components/Popup';
import validator from "validator";


const SignupPage = (props)=> {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState("")

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, error } = userSignup;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(validator.isEmpty(email) || validator.isEmpty(name) || validator.isEmpty(password) || validator.isEmpty(confirmPassword)){
      setMessage("All fields are required");
      return;
      }
      
 if(!validator.isEmail(email)){
   setMessage("Invalid Email");
   return;
   }
 
   if(!validator.isAlphanumeric(name)){
   setMessage("Username must be alphanumeric");
   return;
   }

   if(password.length < 6 ){
      setMessage("Password must be at least 6 characters");
      return;
   }

   if(password !== confirmPassword){
   setMessage("Passwords do not match");
   return;

   }
   setMessage("")
    dispatch(signup(name, email, password));
    

   

    
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    
    <div>
        {message && <Popup variant="danger">{message}</Popup>}
        {!message && error && <Popup variant="danger">{error}</Popup>}

    <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="text-align" >Create An Account</h1>
        </div>
        
        <div>
          <label htmlFor="email">E-mail </label>
          <input
            type="email"
            id="email"
            placeholder="Enter E-mail "
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Username"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="btn" type="submit">
           Sign Up
          </button>
        </div>
        <div>
          <label />
          <div>
          <div className="signup"> Already have an account? {" "}<Link
          style={{color:"orangered"}}
          to={`/login?redirect=${redirect}`}>Login</Link></div>

          </div>
        </div>
      </form>

</div>
  );
}


export default SignupPage;