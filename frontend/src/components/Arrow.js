import React from 'react'
import leftArrow from './chevron-left-solid.svg'
import rightArrow from './chevron-right-solid.svg'
import styled from '@emotion/styled'

 

const Arrow = ({ direction, handleClick }) => {
  const ArrowStyle = styled.div`
 display: flex;
 position: absolute;
 top: 50%;
 ${direction === 'right' ? `right: 25px` : `left: 25px`};
 height: 30px;
 width: 20px;
 margin-right: 2rem;
 justify-content: center; 
 border-radius: 50%;
 cursor: pointer;
 align-items: center;
 transition: transform ease-in 0.1s;
 &:hover {
   transform: scale(1.1);
 }
 img {
   transform: translateX(${direction === 'left' ? '-2' : '2'}px);
  
   
   &:focus {
     outline: 0;
   }
 }
 @media(max-width:900px){
   margin-right:0;
   .leftArrow{
     margin-left:-4.6rem;
   }
   .rightArrow{
     margin-right:-2.2rem;
   }
  img {
    height: 3rem;
    font-weight: bolder;
  }
  
}
`

  return(

  <ArrowStyle
    onClick={handleClick}
    
  
  >
    {direction === 'right' ? <img className="rightArrow"  src={rightArrow} alt=""  /> : <img className="leftArrow" 
    alt="" src={leftArrow} 
     />}
  </ArrowStyle>
)}

export default Arrow