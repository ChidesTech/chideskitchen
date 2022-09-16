import React, { useEffect } from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Autoplay} from "swiper";
import CategoryItem from './CategoryItem';
import styled from '@emotion/styled';
import "swiper/swiper-bundle.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../redux-actions/productActions';

SwiperCore.use([Navigation, Autoplay]); 

const ProjectSectionStyles= styled.div`
padding:  0;
// display: flex;
.project-items{
  display: flex;
  gap:0rem;
  // margin-top: 5rem;
  
 
}
.container{
    padding: 0 1rem;
}
.center{
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 10rem;
 
}
.swiper-container{
  padding-top: 8rem;
  max-width:100%

}

.swiper-button-prev,
.swiper-button-next{
  position: absolute;
  height: 50px;
  width: 50px;
//  background-color: orangered;
  z-index:18;
  right: 60px;
  left: auto;
  top: 7.3rem;
  transform: translateY(50%);
   color:white;
   border-radius:8px;
   text-shadow: 3px 1px 1px orangered
}

.swiper-button-next{
  right:0;
  

}
.swiper-button-prev{
 left:0
 

}
.swiper-button-prev::after,
.swiper-button-next::after{
  font-size: 2rem;
  font-weight: bolder;
}
@media only screen and (max-width: 768px){
  .project-items{
    max-width: 400px;
    margin: 0 auto;
    margin-top: 7rem;
    gap: 5rem;
    .project-img{
      width:100% 
    }
  }
  .swiper-button-prev,
.swiper-button-next{
  position: absolute;
  height: 40px;
  width: 40px;
   background-color: transparent;
  z-index:10;
  right: 60px;
  left: auto;
  top: 8.5rem;
  transform: translateY(50%);
   color:white;
   border-radius:3px;
   text-shadow:none;
  font-weight: bolder;
  z-index:2;
  text-shadow:1px 0 1px orangered;

   
}
 .swiper-button-next{
     right:0;
   }
   .swiper-button-prev{
     left:0
    
   
    }
   .swiper-button-prev::after,
.swiper-button-next::after{
  font-size: 2rem;
  font-weight: bolder;
  opacity:1;
}
}
`
const ProjectSection = (props) => {
  const categoryList = useSelector(state=>state.categoryList);
  const {loading, error, categories}= categoryList;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(listCategories())
},[dispatch])
    // const projects = [
    //     {
    //       id: "qy",
    //       name: 'Soup',
    //       desc:
    //         'An application to track your all data from one place. I developed the website and the mobile app',
    //       img: "",
    //     },
    //     {
    //       id: "qn",
    //       name: 'Rice',
    //       desc:
    //         'An application to track your all data from one place. I developed the website and the mobile app',
    //       img: "images/jollof.jpg",
    //     },
    //     {
    //       id: "qm",
    //       name: 'Tubers',
    //       desc:
    //         'An app to help people to get an overview of how they can make the city beautiful.',
    //       img:"images/yam.jpg",
    //     },
    //     {
    //       id: "qj",
    //       name: 'Salad',
    //       desc:
    //         'Using this app you can track any e coin. Also you will get a good advise about investment form the professional',
    //       img: "images/friedrice.jpg",
    //     },
    //     {
    //       id: "qt",
    //       name: " Category",
    //       desc:
    //         'A portfolio for Cavin jr. A artist from New york city. The portfolio is made using ReactJs and GatsbyJs.',
    //       img: "images/egusi.jpg",
    //     },
    //     {
    //       id: "qs",
    //       name: "Drinks",
    //       desc:
    //         'A portfolio for Cavin jr. A artist from New york city. The portfolio is made using ReactJs and GatsbyJs.',
    //       img: "images/egusi.jpg",
    //     },
    //     {
    //       id: "qu",
    //       name: "Small Chops",
    //       desc:
    //         'A portfolio for Cavin jr. A artist from New york city. The portfolio is made using ReactJs and GatsbyJs.',
    //       img: "images/egusi.jpg",
    //     },
    //     {
    //       id: "q",
    //       name: 'Drinks',
    //       desc:
    //         'A tracking website that will show the performance of the website. Also you will get some useful advice to improve the performance.',
    //       img: "images/smoothie.jpg",
    //     },
    //   ];
    return (
      <ProjectSectionStyles >
          <div className="container">
       <div className="project-items">
           <Swiper spaceBetween={0}  slidesPerView={2} navigation
           breakpoints={
             {640:{
               //when >=640px
               slidesPerView : 2, 
             },
            768:{
              slidesPerView : 4
            },
            1200:{
              slidesPerView:5
            }
            }
           }
           >
       {  loading ? "" :error ?"" : categories.map((project, index)=>{
          // if(index>=5) return null;
         return (<>

         <SwiperSlide  key={index }>
             <CategoryItem  key={project.id } title={project.name}
             img={project.image} 
             desc={project.desc} url={`/`}
             />

           </SwiperSlide>

       </>
       )

         
       })}
           </Swiper>
       </div>
      </div>
      
       
      </ProjectSectionStyles>
    );
  }
  
  export default ProjectSection;