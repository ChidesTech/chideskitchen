import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteReservation, listReservations } from "../redux-actions/orderActions";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";
import { RESERVATION_DELETE_RESET } from "../redux-constants/orderConstants";

const ReservationListPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const reservationList = useSelector(state => state.reservationList);
    const {loading, error, reservations} = reservationList;
    const reservationDelete = useSelector(state=>state.reservationDelete);
    const { error :errorDelete, success: successDelete}= reservationDelete;
    if(!userInfo){
        props.history.push("/login");
    }
    const dispatch = useDispatch();
    let sn = 0;
useEffect(()=>{
    if(successDelete){
           
        dispatch({type: RESERVATION_DELETE_RESET});
    }
    dispatch(listReservations());
},[dispatch, successDelete]);
const deleteHandler=(orderId)=>{
    if(window.confirm("Are you sure you want to delete this reservation?")){
        dispatch(deleteReservation(orderId))
    }
 }
    return (<div className="order-tbl">
      <h1 style={{textAlign:"center", color:"red",textShadow:"1px 1px 1px black",fontSize:"2.2rem"}}>Table Reservations</h1>
      {errorDelete && <Popup variant="danger">{errorDelete}</Popup> }

       {loading ?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    />  :
       error ? <Popup variant="danger">{error}</Popup> :
       
       (
           <table>
               {reservations.length===0 ? <Popup>No reservation has been created.</Popup>:
               <>
                <thead>
        <tr style={{background:"white"}}>
            <th>S.N</th>
            <th>Full Name</th>
             <th>Date</th>
             <th>Time</th>
             <th>Persons</th>
             <th>Action</th>
        </tr>
        </thead>
        <tbody>
            
        {reservations.map((reservation)=>{
             
            return(
            <tr  key={reservation._id}>
                <td >{sn+=1}.</td>
                <td >{reservation.fullName}</td>
                <td >{reservation.reservationDate.substring(0,10)}</td>
                <td >{reservation.reservationTime}</td>
                <td >{reservation.numPersons}</td>
                 
               <td >   
                
                <button type="button" style={{ cursor:"pointer", background:"red"}} className="btn-small"
                onClick={()=>deleteHandler(reservation._id)}
                ><i className="fa fa-trash-alt fa-lg"></i></button></td> 
            </tr>
        )}

        )}</tbody>
               </>
               }
              
               
           </table>
       )}
    </div>
    )

}
    ;

export default ReservationListPage;