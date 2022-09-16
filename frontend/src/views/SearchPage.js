import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Popup from "../components/Popup";
import Product from "../components/Product";
import { listCategories, listProducts } from "../redux-actions/productActions";
import { LinearProgress } from "@material-ui/core";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Autoplay} from "swiper";
import styled from '@emotion/styled';
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation, Autoplay]); 

const ProjectSectionStyles= styled.div`
padding:  0;

// display: flex;
// flex-direction: column;
.project-items{
  display: flex;
  gap:3rem;
  margin-top: 5rem;
  
 
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
//  background-color: red;
  z-index:18;
  right: 60px;
  left: auto;
  top: 7.3rem;
  transform: translateY(50%);
   color:white;
   border-radius:8px;
   text-shadow: 3px 1px 1px red
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
    flex-direction: column;
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
  text-shadow:1px 0 1px red;

   
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
const SearchPage=(props)=>{
    const {name = "all", category="all", pageNumber=1} = useParams();
    const productList = useSelector(state=>state.productList);
    const {loading, error, products, page, pages}= productList;
    const dispatch = useDispatch();
useEffect(()=>{
   
        dispatch(listCategories())
     
    dispatch(listProducts({pageNumber,
        name : name !=="all" ? name : "",
        category : category !=="all" ? category : "",

}))
},[dispatch, name, category, pageNumber])

const getFilterUrl =(filter)=>{
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/product/${filterName}/pageNumber/${filterPage}`

}

return <ProjectSectionStyles >
         
     
 
{loading?  <LinearProgress
            style={{margin:"10% 30%",height:"2rem"}}
           
          /> : error? <Popup>{error}</Popup>
        :<div >

<div style={{color:"red", textShadow:"1px 1px 0 black"}} ></div>
{/* <div className="container">
       <div className="project-items">
           <Swiper spaceBetween={10}  slidesPerView={2} navigation
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
       {  loadingCategory ? "" :errorCategory ?"" : categories.map((c, index)=>{
          // if(index>=5) return null;
         return (<>

         <SwiperSlide navigation  key={index }>
            
             <CategoryItem className={c.name === category ? "active" : ""}  key={c.id } title={c.name}
             img={c.image} 
             desc={c.desc} url={getFilterUrl({category: c.name})}
             />
          
             

           </SwiperSlide>

       </>
       )

         
       })}
           </Swiper>
       </div>
      </div>
       */}
       
        {/* <CategorySwiper style={{position:"fixed"}} ></CategorySwiper> */}
        {/* <h4 style={{color:"red",marginTop:"-2rem"}} >{products.length>1 ? `${products.length} results found` :
         `${products.length} result found`} </h4> */}
        
        <ul className="products">
        {products.length > 0 && products.map((product)=>(
        <Product key={product._id}  product={product}></Product>
        ))}
        </ul>
        {/* <div className="pageBtn">
         { [...Array(pages).keys()].map(x=>{
           return (<>
           <Link className={x+1 === page ? "activePage" :""}  key={x+1} to={getFilterUrl({page:x+1})}>{x+1}</Link>
           </>)
         })
         }
        </div> */}

<div className="pageBtn">
           <Swiper spaceBetween={2}  slidesPerView={10} navigation
           breakpoints={
             {640:{
               //when >=640px
               slidesPerView : 10, 
             },
            768:{
              slidesPerView : 10
            },
            1200:{
              slidesPerView:25
            }
            }
           }
           >
       { [...Array(pages).keys()].map((x, index)=>{
            // if(index>=25) return null;
         return (<>

         <SwiperSlide navigation  key={index }>
            
         <Link className={x+1 === page ? "activePage" :""}  key={x+1}
           to={getFilterUrl({page:x+1})}
           >{x+1}</Link>
          
             

           </SwiperSlide>

       </>
       )

         
       })}
           </Swiper>
       </div>
        </div>
        
        }
 </ProjectSectionStyles>
}

export default SearchPage