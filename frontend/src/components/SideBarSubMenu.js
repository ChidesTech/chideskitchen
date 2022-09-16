import React from 'react';
import styled from '@emotion/styled'
import { useState } from 'react';


const All = styled.div`
 .navlink{ background: white;
  height:60px;
  padding-left:3rem;
  align-items:center;
  text-decoration:none;
  color:orangered;
  
  font-size:1.5rem;
  display:flex;
  font-weight: bolder;

  &:hover{
    background:orangered;
    color:white;
    border-left: 5px solid orangered;
    
}
@media(max-width:700px){
    font-size:1.6rem;
 }   
}
}

.sidebarlink{
    display:flex;
    color: orangered;
    justify-content: space-between;
    align-items:center;
    padding:0px 10px;
    font-size:1.6rem;
    list-style:none;
    height:4.5rem;
    font-weight: bolder;
    background: white;
 
 &:hover{
     background:orangered;
     color:white;
     border-left: 5px solid orangered;
     
 }


 @media(max-width:700px){
     font-size:2rem;
  height:60px;

    
    }



}
`;

const SideBarLabel = styled.span`
margin-left:16px;
`

const SideBarSubMenu = ({item}) => {
    const [subnav, setSubNav] = useState(false);
    const showSubNav = ()=> setSubNav(!subnav);

    
 return (<All>
    <a className="sidebarlink"  href ={item.path} onClick={item.subNav && showSubNav}>
 <div>
     {item.icon}
     <SideBarLabel>{item.name}</SideBarLabel>
 </div>
 <div>
     {item.subNav && subnav ? item.iconOpen: item.subNav? item.iconClose: null}
 </div>
    </a >
    {subnav &&
      item.subNav.map((item, index)=>{
        return(
            
                 <a className="navlink" href={item.path}>
                 {item.icon}
    <SideBarLabel>{item.name}</SideBarLabel>
    </a>
          
            
       )
   }) 
    }
     </All>
    )
}

export default SideBarSubMenu