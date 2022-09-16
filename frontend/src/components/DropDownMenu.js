import React from "react";


const DropdownMenu =()=>{

  const  DropdownItem=(props)=>{
   return(
       <a href="" className="menu-item">
           {/* <span className="icon-button">{props.leftIcon}</span> */}
   {props.children}
   {/* <span className="icon-right">{props.rightIcon}</span> */}

       </a>
   )
    }
    return(
       
        <div className="nav-dropdown">
          <div className="dropdown">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem >
       Seller
      </DropdownItem>
      <DropdownItem >
      Admin
      </DropdownItem>
      <DropdownItem >
     Logout
      </DropdownItem>
          </div>
           
        </div>
      
    )
};

export default DropdownMenu;