
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Dot = ({ active }) => {
    const DotStyle = styled.div`
    padding: 10px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 50%;
    background: ${active ? 'orangered' : 'white'};
    @media(max-width:900px){
    padding: 7px;
    margin-right:5px;
       }
    @media(max-width:500px){
    padding: 5px;
    margin-right:7px;
       }
    ` 
    return (
  <DotStyle></DotStyle>
)}

const Dots = ({ slides, activeIndex }) => {
    const DotsStyle = styled.div`
    position: absolute;
    bottom: 25px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    `

    return(
  <DotsStyle
    css={css`
     
    `}
  >
    {slides.map((slide, i) => (
      <Dot key={slide+i} active={activeIndex === i} />
    ))}
  </DotsStyle>
)}

export default Dots;