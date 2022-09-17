import React, {  useEffect} from "react";
import Product from "../components/Product";
import Popup from "../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { listCategories, listProducts } from "../redux-actions/productActions";
 import Slider from "../components/Slider";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
// import SwiperCore, {Navigation, Autoplay} from "swiper";
// import CategoryItem from '../components/CategoryItem';
import styled from '@emotion/styled';
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";
import Hero from "../components/Hero"
// SwiperCore.use([Navigation, Autoplay]); 

const ProjectSectionStyles= styled.div`
padding:  0;

// display: flex;
// flex-direction: column;

.cards{
  border-radius : 1rem;
  font-family: 'Courgette';
  background-color: orangered !important;
  color : wheat;
  text-shadow : 1px 1px 1px black;
 padding-top : 1rem;
}
.project-items{
  display: flex;
  //gap:3rem;
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
  top: 9.5rem;
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

.box-group{
  
  display: flex;
  justify-content: space-around;
  align-items: center;
 
  padding: 5rem 0;
  padding-top: 19rem;
  padding-bottom: 15rem;
 


}
.box{
  width: 30%;
  color: navy;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}
.box i{
 font-size: 700%;
 color:navy;

 
}
.box img:hover{
transform: rotate(-5deg);
animation-duration: 2s;

 
}

.box h2{
  // color:navy;
  z-index: 3;
  text-align: center;
  font-size: 2.6rem;
  margin-bottom: 1.6rem;
  font-weight:bolder;
  // border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  padding-bottom:.2rem;
  
  }
.box h3{
// color: navy;
z-index: 3;
text-align: center;
font-size: 1.8rem;
font-family: 'Montserrat';

}


.round{
  padding:.3rem ;
  margin-left:-5rem;
  font-family:"Roboto Mono";
  
}

.num{
  background: orangered;
  color: white;
  padding:1rem 1.6rem;
  border-radius:50%;
  font-size: 2.3rem;
  text-shadow:1px 1px 8px white;

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

.box-group{
  flex-direction: column;
  gap:3rem;
  


}

.box{
   width: 90%;
   margin-bottom: 7rem;
}
}
`
const HomePage =(props)=>{
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const{ error, products,pages, page, loading} = productList;
    // const categoryList = useSelector(state=>state.categoryList);
    // const {loading:loadingCategory, error: errorCategory, categories}= categoryList;
    const {
      // name = "all",
      //  category="all", 
       pageNumber=1} = useParams();
    // SLIDER
 

    useEffect(()=>{
        dispatch(listCategories())

   dispatch(listProducts({pageNumber}))
    },[dispatch, pageNumber]);
    // const getFilterUrl =(filter)=>{
    //     const filterPage =  filter.page || pageNumber;
    //     const filterCategory = filter.category || category;
    //     const filterName = filter.name || name;
    // return `/search/category/${filterCategory}/product/${filterName}/pageNumber/${filterPage}`

    
    // }
    return(<ProjectSectionStyles>
        <div className="hero">
        {/* <Slider autoPlay={5}></Slider> */}
        <Hero></Hero>
        </div>

        <h3 style={{textAlign:"center",fontSize:"3rem", marginBottom:"-10rem", marginTop:"5rem",color:"orangered", textShadow:"1px 0 0 black"}}>Our Services</h3>

{/* <h1 style={{marginBottom:"-7rem"}} className="heading"> <span>Shop</span> With Us </h1> */}

        <div className="services"  >
     <div className="box-group" style={{backgroundColor :"black"}}>

     <div className="box">
       <div>
     <div  className="round"><span className="num">1</span></div>
     {/* <img style={{height:"17rem"}} src="/images/shopIcon.gif" alt=""/> */}
     
     <i className="glyph-icon flaticon-pizza3"></i>

     
     </div>
      <div className="cards">
       
      <h2>Food Delivery</h2>
      
<h3>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis quam magni, error eveniet eaque odit nesciunt numquam magnam nobis. Pariatur, maiores. Ratione corrupti ab vel consectetur excepturi accusantium placeat!</h3>      </div>
 </div>
     <div className="box">
     <div>
     <div  className="round"><span className="num">2</span></div>

     <i className="glyph-icon flaticon-plate7"></i>
     </div>

      <div className="cards" >
      <h2>Table Reservation</h2>
       <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis quam magni, error eveniet eaque odit nesciunt numquam magnam nobis. Pariatur, maiores. Ratione corrupti ab vel consectetur excepturi accusantium placeat!</h3>    
     </div>
 </div>
     <div className="box">
     <div>
     <div  className="round"><span className="num">3</span></div>

     <i  className="glyph-icon far fa-clipboard"></i>
     </div>
      <div className="cards" style={{marginTop:"2rem"}}>
      <h2>Restaurant Management</h2>
      
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis quam magni, error eveniet eaque odit nesciunt numquam magnam nobis. Pariatur, maiores. Ratione corrupti ab vel consectetur excepturi accusantium placeat!</h3>  
    </div>
 </div>
     </div>


        </div>
        {/* <h3 style={{textAlign:"center",fontSize:"2rem", textTransform:"uppercase", marginTop:"-4rem",color:"orangered", textShadow:"1px 0 0 black"}}>Browse By Categories</h3> */}
        {/* <h3 style={{textAlign:"center",fontSize:"3rem", marginBottom:"-6rem",color:"orangered", textShadow:"1px 0 0 black"}}>Browse</h3> */}

{/* <h1 className="heading"> Browse <span>Categories</span> </h1> */}

        {/* <div className="container">
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
       {  loadingCategory ? "" :errorCategory ?"" : categories.map((c, index)=>{
           //if(index>=5) return null;
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
      </div> */}
{/* <h1 className="heading">  <span>Product</span> Gallery</h1> */}

      <h2 style={{textAlign:"center",fontSize:"3rem", marginTop:"3rem", color:"orangered", textShadow:"1px 0 0 black"}}> Food Menu </h2>
       {loading?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    /> :error?(<Popup variant="danger">{error}</Popup>):
       
        (
            <>

        <ul className="products">
        {products.map((product, index)=>(
        <Product key={product._id + index}  product={product}></Product>
        ))}
        </ul>
        <div className="pageBtn">
         { [...Array(pages).keys()].map(x=>{
           return (<>
           <Link className={x+1 === page ? "activePage" :""}  key={x+1}
           to={`/pageNumber/${x+1}`}
           >{x+1}</Link>
           </>)
         })
         }
        </div>
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

         <SwiperSlide navigation="true"  key={index}>
            
         <Link className={x+1 === page ? "activePage" :""}  key={x+1}
           to={`/pageNumber/${x+1}`}
           >{x+1}</Link>
          
             

           </SwiperSlide>

       </>
       )

         
       })}
           </Swiper>
       </div>
     
        </>
        )}
        
        </ProjectSectionStyles>
    )
};

export default HomePage;