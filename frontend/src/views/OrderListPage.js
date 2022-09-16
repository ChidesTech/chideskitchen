import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteOrder, listOrders } from "../redux-actions/orderActions";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";
import { ORDER_DELETE_RESET } from "../redux-constants/orderConstants";

const OrderListPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const orderDelete = useSelector(state=>state.orderDelete);
    const { error :errorDelete, success: successDelete}= orderDelete;
    if(!userInfo){
        props.history.push("/login");
    }
    const dispatch = useDispatch();
    let sn = 0;
useEffect(()=>{
    if(successDelete){
           
        dispatch({type: ORDER_DELETE_RESET});
    }
    dispatch(listOrders());
},[dispatch, successDelete]);

const deleteHandler=(orderId)=>{
   if(window.confirm("Are you sure you want to delete this order?")){
       dispatch(deleteOrder(orderId))
   }
}
    return (<div className="order-tbl">
      <h1 style={{textAlign:"center",color:"orangered",textShadow:"1px 1px 1px black", fontSize:"2.2rem"}}>Orders</h1>
      {errorDelete && <Popup variant="danger">{errorDelete}</Popup> }
       {loading ?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    />  :
       error ? <Popup variant="danger">{error}</Popup> :
    
       
       (
       
           <table>
               {orders.length===0? <Popup>No product has been ordered.</Popup>:(
<>
<thead>
        <tr style={{background:"white"}}>
            <th>S.N</th>
            <th>Username</th>
             <th>Date</th>
             <th>Total(₦)</th>
             <th>Paid</th>
             <th>Delivered</th>
             <th>Action</th>
        </tr>
        </thead>
        <tbody>
            
        {orders.map((order)=>{
             
            return(
            <tr key={order._id}>
                <td>{sn+=1}.</td>
    <td>{order.user !== null ? order.user.name : "User" }</td> 
                 
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid? order.paidAt.substring(0, 10) : "No" }</td>
                <td>{order.isDelivered? order.deliveredAt.substring(0, 10) : "No" }</td>
                <td>   <button style={{backgroundColor:"orangered",padding:".75rem 1.5rem",marginRight:"1rem",cursor:"pointer", color:"white"}} type="button" className="btn-small"

                onClick={()=>{props.history.push(`/order/${order._id}`)}}
                ><i className="fa fa-lg fa-info"></i></button>
                
                <button type="button" style={{ cursor:"pointer", background:"red"}} className="btn-small"
                onClick={()=>deleteHandler(order._id)}
                ><i className="fa fa-trash-alt fa-lg"></i></button></td>
            </tr>
        )}

        )}</tbody>
               
</>


)}
              
           </table>
       )}
    </div>
    )

}
    ;

export default OrderListPage;