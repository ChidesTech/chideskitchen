import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../redux-actions/userActions';
import Popup from '../components/Popup';
import validator from "validator";

 const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("")

  const redirect = props.location.search
    ? props.location.search.split('=')[1] : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      setMessage("All fields are required");
      return;
  }

  if (!validator.isEmail(email)) {
      setMessage("Invalid Email");
      return;
  }
    setMessage("");
    dispatch(signin(email, password))

   

    ;
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    
    <div>
        {message &&  <Popup variant="danger">{message}</Popup>}
        {!message && error &&  <Popup variant="danger">{error}</Popup>}


     <form style={{ borderRadius:"0"}} className="form" onSubmit={submitHandler}>
        <div  >
          <h1 className="text-align">Sign In To Your Account</h1>
        </div>
        <div>
          <label  htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="btn" style={{width:"100%"}} type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div className="signup">
          Don't have an account? {" "}<Link to={`/signup?redirect=${redirect}`} style={{color: "orangered"}}>Create An Account</Link>
          </div>
        </div>
      </form>

</div>
  );
}


export default LoginPage;