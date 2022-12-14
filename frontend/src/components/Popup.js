import React from "react";


const Popup =(props)=>{
    return(
   <div className={`alert alert-${props.variant|| "info"}`}>
       {props.children}
   </div>
    )
};

export default Popup;