import React from 'react'
import "./Slide.css"

const Slide = ({ image, text, text2 }) => (
  <div style={{display:"flex",  height: "100",
  width: "100%",}}>
  <img className="imageSlide" 
    style={{
      height: "100",
      width: "100%",
      // backgroundImage: `url(${image})`,
      // backgroundSize: "cover",
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "center",
    }}
    src={image} alt=""
  />
  
  <p className="text" >  {text}</p>
  <p className="text2">{text2}</p>
  
  </div>
)

export default Slide