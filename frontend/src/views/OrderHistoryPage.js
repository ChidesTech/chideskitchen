import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderPersonal } from "../redux-actions/orderActions";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";

const OrderHistoryPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const orderPersonal = useSelector(state => state.orderPersonal);
    const {loading, error, orders} = orderPersonal;
    if(!userInfo){
        props.history.push("/login");
    }
    const dispatch = useDispatch();
    let sn = 0;
useEffect(()=>{
    dispatch(listOrderPersonal());
},[dispatch])
    return (<div className="order-tbl">
      <h1 style={{textAlign:"center",color:"orangered",textShadow:"1px 1px 1px black", fontSize:"2.2rem"}}>My Order History</h1>
       {loading ?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    />  :
       error ? <Popup variant="danger">{error}</Popup> :
       
       (
           <table>
               <thead>
        <tr style={{background:"white"}}>
            <th>S.N</th>
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
                <td style={{textAlign:"center"}}>{sn+=1}.</td>
                <td style={{textAlign:"center"}}>{order.createdAt.substring(0, 10)}</td>
                <td style={{textAlign:"center"}}>{order.totalPrice}</td>
                <td style={{textAlign:"center"}}>{order.isPaid? order.paidAt.substring(0, 10) : "No" }</td>
                <td style={{textAlign:"center"}}>{order.isDelivered? order.deliveredAt.substring(0, 10) : "No" }</td>
                <td style={{textAlign:"center"}}> <button style={{backgroundColor:"orangered",marginLeft:"10%", padding:"1.5rem 2.2rem",marginRight:"1rem",cursor:"pointer", color:"white"}} type="button" className="btn-small"

onClick={()=>{props.history.push(`/order/${order._id}`)}}
><i className="fa fa-lg fa-info"></i></button></td>
            </tr>
        )}

        )}</tbody>
               
           </table>
       )}
    </div>
    )

}
    ;

export default OrderHistoryPage;