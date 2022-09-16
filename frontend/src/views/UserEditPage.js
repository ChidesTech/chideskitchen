import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../redux-actions/userActions";
import { LinearProgress } from "@material-ui/core";
import Popup from "../components/Popup";
import { USER_UPDATE_RESET } from "../redux-constants/userConstants";

const UserEditPage = (props) => {
    const userId = props.match.params.id;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuper, setIsSuper] = useState(false);
    const userSignin  = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    useEffect(()=>{
      if(!userInfo){
        props.history.push("/login");
    }
    })
    const userUpdate = useSelector(state=> state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate} = userUpdate;
    const dispatch = useDispatch();
    useEffect(()=>{
if(!user || user._id !== userId){
    dispatch(detailsUser(userId))
}else{
    setIsAdmin(user.isAdmin);
    setIsSuper(user.isSuper);
}
    },[dispatch, userInfo, user, userId])
  const submitHandler=(event)=>{
    event.preventDefault();
      dispatch(updateUser({_id: userId, isAdmin, isSuper}));
      dispatch({type:USER_UPDATE_RESET})
      props.history.push("/users");

   
  }
    return ( <div>

       
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
            
            <form className="form" onSubmit={submitHandler}>
            <div>
              <h1 className="text-align">Update User</h1>
            </div>
              <div>
                <label htmlFor="name">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter Username"
                  value={user.email}
                  readOnly
                  style={{border:"none",marginLeft:"-1rem",fontWeight:"bolder", color:"orangered",fontSize:"1.8rem", textShadow:"1px 0 0 black"}}
                ></input>
              </div>
              <div>
                <label htmlFor="name">Username</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Username"
                  value={user.name}
                  style={{border:"none",marginLeft:"-1rem",fontWeight:"bolder", color:"orangered",fontSize:"1.8rem", textShadow:"1px 0 0 black"}}
                  required
                  readOnly
                ></input>
              </div >
              <br/>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <div>
                <label htmlFor="isAdmin">Admin</label>
                <input
                  id="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e)=> setIsAdmin(e.target.checked)}
                 
                ></input>
              </div>
              <div >
                <label htmlFor="isAdmin">Super Admin</label>
                <input
                  id="isSuper"
                  type="checkbox"
                  checked={isSuper}
                  onChange={(e)=> setIsSuper(e.target.checked)}
                 
                ></input>
              </div>
              
              </div>
            
              <div>
                <label />
                
                <button onClick={submitHandler} className="btn" type="submit">
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

export default UserEditPage;