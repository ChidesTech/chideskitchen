import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../redux-actions/orderActions";
import Popup from "../components/Popup";
import { PayPalButton } from "react-paypal-button-v2";
import Axios from "axios";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../redux-constants/orderConstants";
import { LinearProgress } from "@material-ui/core";


const OrderDetailsPage = (props) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
 const orderDetails = useSelector(state=> state.orderDetails);
 const {loading, error, order} = orderDetails;
 const orderPay = useSelector(state=> state.orderPay);
 const {loading : loadingPay,error : errorPay, success: successPay} = orderPay;
 const orderDeliver = useSelector(state=> state.orderDeliver);
 const {
  //  loading : loadingDeliver,error : errorDeliver,
    success: successDeliver} = orderDeliver;
 const userSignin  = useSelector(state => state.userSignin);
 const {userInfo} = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, order, successPay, successDeliver]);
  const paymentSuccessHandler =(paymentResult)=>{
    dispatch({type: ORDER_PAY_RESET});
    dispatch({type: ORDER_DELIVER_RESET});
     dispatch(payOrder(order, paymentResult))
  }
  const deliverHandler =()=>{
     dispatch(deliverOrder(order._id))
  }
    return (loading ?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    />  :
    error? <Popup variant="danger">{error}</Popup> : <div>
      <h1>Order Id: {order._id}</h1>
      <div className="row top">
        <div style={{marginLeft: "-2rem"}} className="col-2">
          <ul >
            <li>
              <div className="card card-body">
                <h2>Orders</h2>
                <ul style={{paddingLeft:0}}>
                  {order.orderItems.map((item) => (
                    <li style={{marginLeft:0, paddingLeft:0}} key={item.product}>
                      <div className="row">
                        <div>
                        <Link to={`/product/${item.product}`}>

                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                          </Link>

                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ₦{item.price} = ₦{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Delivery Information</h2>
                <p>
                  <strong>Name:</strong> {order.deliveryInfo.fullName} <br />
                  <strong>Mobile Number:</strong> {order.deliveryInfo.mobile} <br />
                  <strong>Address: </strong> {order.deliveryInfo.address},
                  {" "}{order.deliveryInfo.city}, {order.deliveryInfo.postalCode}
                  , {" "}{order.deliveryInfo.country}
                </p>
             
              {order.deliveredAt? <Popup variant="info">Your Order Was Delivered On {order.deliveredAt}</Popup>:
               <Popup variant="danger">Your Order Has Not Been Delivered.</Popup>}
                {order.paidAt? <Popup variant="info">Your Order Will Be Delivered To You Soon.</Popup>:
               <Popup variant="danger">You Have Not Paid For This Order.</Popup>}
              </div>
            </li>
            {/* <li>
              <div className="card card-body">
                <h2>Payment Information</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
              </div>
            </li> */}
            
          </ul>
        </div>
        <div className="shift col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Cost Of Items</div>
                  <div> ₦{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Delivery Cost</div>
                  <div> ₦{order.deliveryCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div> ₦{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"orangered"}}>
                    <strong>Total</strong>
                  </div>
                  <div style={{color:"orangered", borderTop: "1px solid orangered"}}>
                    <strong> ₦{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
             {
               !order.isPaid &&(
                 <li>
                   {!sdkReady ? <div className="processing text-align">Loading...</div>:
                   <>
                   {errorPay && <Popup variant="danger">{errorPay}</Popup>}
                   {loadingPay && <div className="processing text-align">Loading...</div> }
                   <PayPalButton amount={order.totalPrice} onSuccess={paymentSuccessHandler}></PayPalButton>
                   </>
                   }
                 </li>
               )
             }
             {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
               <>
               {/* {errorDeliver} */}
               <button style={{width:"100%", marginTop:".5rem", marginLeft:"-2rem"}} className="btn" onClick={deliverHandler} type="btn">Deliver Order</button>
               </>
             )}
            </ul>
          </div>
        </div>
      </div>
       
    </div>
    )

}
    ;

export default OrderDetailsPage;