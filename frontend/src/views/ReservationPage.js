import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../redux-actions/orderActions";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";

const ReservationPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const [fullName, setFullName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [numPersons, setNumPersons] = useState(1);
    if(!userInfo){
        props.history.push("/login");
    }
    const reservationCreate = useSelector((state) => state.reservationCreate);
    const { loading, success, error } = reservationCreate;

   
   
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(createReservation(fullName, date, time, numPersons));
     if(success){
    props.history.push("/reservation")
};
    }
    
   
    return (<div style={{display:"flex", flexDirection:"column-reverse"}}>
     {loading &&  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    /> }
              {error &&  <Popup variant="danger">{error}</Popup>}
              {success &&  <>

            <Popup variant="info">A Table Has Been Reserved. <span style={{float:"right"}}><a className="btn" style={{padding:".3rem"}}  href="/reservations" >Create Another</a></span></Popup>
              </>}
              {!success &&  <div  className=" reservation">
                
    {!loading && <div className="reservation-details">
    
    <div className=""><h2>Opening Hours</h2></div>

     <div><h3>Monday - Friday</h3></div>

     <div>
         <h4>8am - 12pm (Breakfast) </h4>
         <h4>12pm - 4:30pm (Lunch) </h4>
         <h4>4:30pm - 10pm (Dinner) </h4>
        
     </div>
     <div><h3>Saturday - Sunday</h3></div>

     <div>
     <h4>10am - 12pm (Breakfast) </h4>
         <h4>12pm - 4:30pm (Lunch) </h4>
         <h4>4:30pm - 10pm (Dinner) </h4>
        
     </div>
    

    </div>}
     <div>
   <form   onSubmit={submitHandler}
      className="form">
     <div className=""><h2>Table Reservation</h2></div>
     <div >
    <label htmlFor="fullName" >Full Name</label>
    <input type="text" id="fullName" required placeholder="Enter Full Name" onChange={(e)=> setFullName(e.target.value)}/>
   </div>
    <div style={{display:"flex",gap:"1rem",justifyContent:"space-between",flexDirection:"row"}}>
   <div style={{display:"flex", flexDirection:"column"}}>
    <label htmlFor="date" >Date</label>
    <input type="date" style={{backgroundColor:"white"}} id="date" required  onChange={(e)=>setDate(e.target.value)}/>

</div>
<div  style={{display:"flex", flexDirection:"column"}} >

    <label htmlFor="time" >Time</label>
    <input type="time" min="0"  style={{backgroundColor:"white"}} id="time" required  onChange={(e)=> setTime(e.target.value)}/>
</div>
</div>
<div >
    <label htmlFor="numPersons" >Number Of Persons</label>
    <input type="number" min="1" id="numPersons" required placeholder="Enter Number Of Persons"  onChange={(e)=> setNumPersons(e.target.value)}/>
</div>


<div >
    <label/>
    <button type="submit" className="btn">Submit</button>
</div>
</form>
</div>

      </div>}
    
    </div>)

}
    ;

export default ReservationPage;