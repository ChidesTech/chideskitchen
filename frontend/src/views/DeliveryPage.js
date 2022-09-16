import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryInfo } from "../redux-actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const DeliveryPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector((state)=> state.cart);
    const {deliveryInfo, cartItems} = cart;
    if(!userInfo ){
        props.history.push("/login");
    }
    
    if( cartItems.length ===0 ){
        props.history.push("/");
    }
    
    const [fullName, setFullName] = useState(deliveryInfo.fullName);
    const [mobile, setMobile] = useState(deliveryInfo.mobile);
    const [address, setAddress] = useState(deliveryInfo.address);
    const [city, setCity] = useState(deliveryInfo.city);
    const [country, setCountry] = useState(deliveryInfo.country);
    const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode);
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
     e.preventDefault();
    dispatch(saveDeliveryInfo({fullName,mobile, address, city, postalCode, country}));
    props.history.push("/payment-method");
    }
    return (<div className=" checkout-steps">
<CheckoutSteps step1 ></CheckoutSteps>
<form   onSubmit={submitHandler}
  className="form">
     <div className=""><h2>Delivery Details</h2></div>
<div >
    <label htmlFor="fullName" >Full Name</label>
    <input type="text" id="fullName" required placeholder="Enter Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
</div>
<div >
    <label htmlFor="mobile" >Mobile Number</label>
    <input type="number" min="0" id="mobile" required placeholder="Enter Mobile Number" value={mobile} onChange={(e)=> setMobile(e.target.value)}/>
</div>
<div >
    <label htmlFor="address" >Address</label>
    <input type="text" id="address" required placeholder="Enter Address" value={address} onChange={(e)=> setAddress(e.target.value)}/>
</div>
<div >
    <label htmlFor="city" >City</label>
    <input type="text" id="city" required placeholder="Enter City" value={city} onChange={(e)=> setCity(e.target.value)}/>
</div>
<div >
    <label htmlFor="postalCode" >Postal Code</label>
    <input type="text" id="postalCode" required placeholder="Enter Postal Code" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}/>
</div>
<div >
    <label htmlFor="country" >Country</label>
    <input type="text" id="country" required placeholder="Enter Country" value={country} onChange={(e)=> setCountry(e.target.value)}/>
</div>

<div >
    <label/>
    <button type="submit" className="btn">Step 1 of 3</button>
</div>
</form>
      </div>
    )

}
    ;

export default DeliveryPage;