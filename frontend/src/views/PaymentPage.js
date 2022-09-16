import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux-actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = (props) => {
  
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart);
    const {deliveryInfo} = cart;
    if(!deliveryInfo.address){
        props.history.push("/delivery");
    }
  const submitHandler = (event) => {
  event.preventDefault();
  dispatch(savePaymentMethod(paymentMethod));
  props.history.push("/order-now");
  }
  return (

    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler} className="form">
        <div><h2>Payment Method</h2></div>
        
        <div >
          <input  type="radio"  value="PayPal" id="paypal" name="payment"
            required checked onChange={e => setPaymentMethod(e.target.value)} />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div >
          <input type="radio"  value="Stripe" id="stripe" name="payment" 
          required onChange={e => setPaymentMethod(e.target.value)} />
          <label htmlFor="stripe">Stripe</label></div>
        <div>
          <label />
          <button className="btn" type="submit">
            Step 2 of 3
          </button>
        </div>
        
      </form>

    </div>
  );
}


export default PaymentPage;