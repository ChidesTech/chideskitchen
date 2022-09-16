import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux-actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Popup from "../components/Popup";
import { ORDER_CREATE_RESET } from "../redux-constants/orderConstants";

const PlaceOrderPage = (props) => {
  const cart = useSelector((state)=> state.cart);
  const {deliveryInfo} = cart;
  if(!deliveryInfo.address){
      props.history.push("/payment-method");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const roundUp = num=> Number(num.toFixed(2));
  cart.itemsPrice = roundUp(cart.cartItems.reduce((a,c)=> a+ c.qty*c.price,0));
  cart.deliveryCost = cart.itemsPrice>5000?roundUp(1000): roundUp(500);
  cart.taxPrice = 0;
  cart.totalPrice = cart.itemsPrice +  cart.deliveryCost + cart.taxPrice;
  const dispatch = useDispatch();
  const orderHandler =()=>{
      dispatch(createOrder({...cart, orderItems : cart.cartItems}))
  }
  useEffect(() => {
     if (success) {
        dispatch({ type: ORDER_CREATE_RESET });
        props.history.push(`/order/${order._id}`);
       

    }
  }, [dispatch, order, props.history, success, orderCreate]);
    return (<div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <div style={{marginLeft: "-2rem"}} className="col-2">
          <ul>
           
           
            <li>
              <div className="card card-body">
                <h2>Orders</h2>
                <ul  style={{paddingLeft:0}}>
                  {cart.cartItems.map((item) => (
                    <li style={{marginLeft:0, paddingLeft:0}} key={item.product}>
                      <div  className="row">
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
            </li> <li>
              <div className="card card-body">
                <h2>Delivery Information</h2>
                <p>
                  <strong>Name:</strong> {cart.deliveryInfo.fullName} <br />
                  <strong>Mobile Number:</strong> {cart.deliveryInfo.mobile} <br />
                  <strong>Address: </strong> {cart.deliveryInfo.address},
                  {" "}{cart.deliveryInfo.city}, {cart.deliveryInfo.postalCode}
                  , {" "}{cart.deliveryInfo.country}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="shift col-1"  >
          <div style={{margin: "auto !important"}} className="card card-body">
            <ul>
              <li>
                <h2>Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Total Cost Of Items</div>
                  <div> ₦{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Delivery Cost</div>
                  <div> ₦{cart.deliveryCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div> ₦{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"orangered"}}>
                    <strong>Total</strong>
                  </div>
                  <div style={{color:"orangered", borderTop: "1px solid orangered"}}>
                    <strong> ₦{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={orderHandler}
                  className="btn block"
                  disabled={cart.cartItems.length === 0}
                >
                 Order Now
                </button>
              </li>

             <li>
             {loading && <div className="processing text-align">Processing...</div>}
             </li>
             <li>
              {error &&  <Popup  variant="danger">{error}</Popup>}

             </li>
            </ul>
          </div>
        </div>
      </div>
       
    </div>
    )

}
    ;

export default PlaceOrderPage;