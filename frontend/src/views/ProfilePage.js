import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../redux-actions/userActions";
import { LinearProgress } from "@material-ui/core";
import Popup from "../components/Popup";
const ProfilePage = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const userSignin  = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    useEffect(()=>{
      if(!userInfo){
        props.history.push("/login");
    }
    })
    const userUpdateProfile = useSelector(state=> state.userUpdateProfile);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(()=>{
if(!user){
    dispatch(detailsUser(userInfo._id))

}else{
    setName(user.name)
}
    },[dispatch, userInfo, user])
  const submitHandler=(event)=>{
    event.preventDefault();

    if(password!== confirmPassword){
        setMessage("Passwords do not match");
    }else{
      dispatch(updateUserProfile({userId: user._id, name, password}));
      props.history.push("/account");

    }
  }
    return ( <div>
            {(message && !successUpdate && !loadingUpdate) &&  <><Popup variant="danger">{message}</Popup></>}

       
          {loading ? (
             <LinearProgress
             style={{margin:"10% 30%",height:"2rem"}}
            
           /> 
          ) : error ? (
            <Popup variant="danger">{error}</Popup>
          ) : (
           
            <>
            {loadingUpdate &&  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    /> }
            {errorUpdate && <Popup variant="danger">{errorUpdate}</Popup>}
            {successUpdate &&  <Popup variant="info">Profile Updated Successfully</Popup>}
            <form className="form" onSubmit={submitHandler}>
            <div>
              <h1 className="text-align">Account</h1>
            </div>
              <div>
                <label htmlFor="name">Email</label>
                <input
                style={{border:"none" ,marginLeft:"-1rem", fontWeight:"bolder", color:"orangered",fontSize:"1.8rem", textShadow:"1px 0 0 black"}}
                  id="name"
                  type="text"
                  placeholder="Enter Username"
                  value={user.email}
                  readOnly
                ></input>
              </div>
              <div>
                <label htmlFor="name">Username</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Username"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="password">New Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e)=> setPassword(e.target.value)}
                
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  onChange={(e)=> setConfirmPassword(e.target.value)}

                ></input>
              </div>
            
              <div>
                <label />
                
                <button className="btn" type="submit">
                  Save Changes
                </button>
                
              </div>
              </form>
            </>
            
          )}
        
      </div>
    )

}
    ;

export default ProfilePage;