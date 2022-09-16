import React from 'react';
import Swiper from 'react-id-swiper';
import "swiper/swiper-bundle.min.css"

import styled from '@emotion/styled';

const TestStyle= styled.div`
.slider__container{
    transform: rotate(180deg);
    .swiper_slide{
    transform: rotate(180deg);

    }
padding-top:10rem 
}
`

const Test = () => {
    const params = {
       spaceBetween: 1,
       slidesPerView: 1,
       loop: false,
       direction:"vertical",
       slidesPerGroup:1
    }
    return (<TestStyle>
    <br/>
    <br/>
    <br/>
    <Swiper {...params}>
        <div style={{backgroundColor:"yellow",height:"1rem"}}>1</div>
        <div style={{backgroundColor:"yellow",height:"1rem"}}>2</div>
        <div style={{backgroundColor:"yellow",height:"1rem"}}>3</div>
        <div style={{backgroundColor:"yellow",height:"1rem"}}>4</div>
        <div style={{backgroundColor:"yellow",height:"1rem"}}>5</div>
        
    </Swiper>
    </TestStyle>
    );
  }
  
  
  export default Test;