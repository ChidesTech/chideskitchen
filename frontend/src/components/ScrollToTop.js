import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";


const ScrollToTop =()=>{

let {pathname} = useLocation();

useEffect(()=>{
    window.scrollTo(0, 0);
})

return <div style={{display:"none"}}>{pathname}</div>;

}


export default ScrollToTop;