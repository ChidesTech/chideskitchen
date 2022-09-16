
import React, { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import Dots from './Dots';
import Slide from './Slide';
import SliderContent from './SliderContent';
import "./Slider.css";
/**
 * @function Slider
 */

 const getWidth = () => window.innerWidth;

const Slider = (props) => {
   
  const contents = [
    {id:"a",image:"/images/rotating-banners.jpg", text: "Heavy Discount", text2:" We Offer Heavy Discounts"},
    {id:"b",image:"/images/leopard.jpg", text: "Trendy Wears", text2:"We Are Always In Vogue"},
    {id:"c",image:"/images/watch.jpg", text: "Latest Gadgets", text2:"Best Gadgets A Click Away"},
    {id:"d",image:"/images/rollerskates.jpg", text: "Trendy Footwears", text2:"Grace Your Steps Always"},
    {id:"e",image:"/images/shoe.jpg", text: "Become A Seller", text2:"Partner With Us And Grow"},
    
]
  
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  });

  const { translate, transition, activeIndex } = state;
  const autoPlayRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    resizeRef.current = handleResize
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }
    const resize = () => {
      resizeRef.current()
    }
    const interval = setInterval(play, props.autoPlay * 1000);
    const onResize = window.addEventListener('resize', resize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
    }
  }, [props.autoPlay])
  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }
  const nextSlide = () => {
    if (activeIndex === contents.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (contents.length - 1) * getWidth(),
        activeIndex: contents.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    })
  }
  
  return (
    <div className="slider">
     <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()*contents.length}
      >
       {contents.map((content, i)=>{
         return <Slide key={i}  image={content.image} text2={content.text2} text={content.text} ></Slide>
       })}
      
      </SliderContent>

      {props.autoPlay && (
      <>
            <Arrow direction="left" handleClick={prevSlide}/>
           <Arrow direction="right" handleClick={nextSlide}/>


      
      </>

      )}
<Dots slides={contents} activeIndex={activeIndex} />
     
    </div>
  )
}
Slider.defaultProps ={
  slide:[],
  autoPlay:null
}

export default Slider;