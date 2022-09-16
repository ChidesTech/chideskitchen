import React from "react";
import './Loading.css'


const Loading =()=>{
    return(
       
        <div className="skeleton-wrapper">
           <div className="skeleton">
               <div className="skeleton-indicator" />
           </div>
           
        </div>
      
    )
};

export default Loading;