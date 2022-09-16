import React from "react";


const CheckoutSteps = (props) => {
    
    return (<div className="row checkout-steps">
     <div className={props.step1?"active": "inactive"}>Delivery</div>
     <div className={props.step2?"active": "inactive"}>Payment</div>
     <div className={props.step3?"active": "inactive"}>Order</div>
       
    </div>
    )

}
    ;

export default CheckoutSteps;