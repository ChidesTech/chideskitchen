import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, listProducts } from "../redux-actions/productActions";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";
import { PRODUCT_DELETE_RESET } from "../redux-constants/productConstants";
import { Link, useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Autoplay} from "swiper";
import styled from '@emotion/styled';

import "swiper/swiper-bundle.min.css";
import Swal from "sweetalert2";
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
const ProductListPage =(props)=>{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})


    const productList = useSelector(state=>state.productList);
    const {loading, error, products, pages, page}= productList;
   
    const productDelete = useSelector(state=>state.productDelete);
    const { error :errorDelete, success: successDelete}= productDelete;
    const { pageNumber=1} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        
       
        if(successDelete){
           
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({pageNumber}))
    },[dispatch, successDelete, pageNumber])
const createHandler=()=>{
    dispatch(createProduct());
}
    const deleteHandler=(product)=>{
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
   dispatch(deleteProduct(product._id))
           




        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Product Not Deleted',
                'error'
            )
        }
    })


       
    }

   
    let sn = 1;

return(<ProjectSectionStyles>
      <h1 style={{textAlign:"center",color:"orangered",textShadow:"1px 1px 1px black", fontSize:"2.2rem"}}>Administrator Products</h1>
    {/* {loadingDelete && <LinearProgress style={{margin:"0 30%",height:"1rem"}}/>  } */}
      {errorDelete && <Popup variant="danger">{errorDelete}</Popup> }
    {loading?(<LinearProgress style={{margin:"10% 30%",height:"2rem"}} /> )
    : error? <Popup variant="danger">{error}</Popup>:
      (<><table className="table">
          {products.length>0 ?  (
              <>
<thead>
    <tr style={{backgroundColor:"white", padding:"1rem 0"}}>
        <th>S.N</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>
          {/* <button type="button" 
        onClick={createHandler}
        style={{backgroundColor:"orangered",marginRight:".5rem",cursor:"pointer", color:"white" ,padding:"1.2rem 1rem"}}
         className="btn-small">Add Product <i className="fa fa-plus"></i></button> */}
         <Link to="/add-product" style={{backgroundColor:"orangered",cursor:"pointer", color:"white" ,padding:"1.2rem 1rem"}}
         className="btn-small" > Add Product <i className="fa fa-plus"></i></Link>
         
         </th>
    </tr>

</thead>
<br/>
<tbody>
    { products.map(product=>(
        <tr key={product._id} >
     <td style={{ padding:"2rem 0", textAlign:"center"}}>{sn++}</td>
     <td > <img style={{height: "5rem", width: "7rem"}} src={product.image} alt=""/> </td>
     <td style={{textAlign:"center"}} >{product.name}</td>
     <td style={{textAlign:"center"}}>{product.price}</td>
     <td style={{textAlign:"center"}}>{product.category }</td>
    <td style={{textAlign:"center"}}>
  
   <button style={{backgroundColor:"orangered",marginRight:"1rem",cursor:"pointer", color:"white"}} type="button" className="btn-small"
                 onClick={()=>{props.history.push(`/product/${product._id}/edit`)}}
                > <i className="fa fa-lg fa-edit"></i></button> 
    <button type="button" style={{ cursor:"pointer", background:"red"}} className="btn-small"
                onClick={()=>deleteHandler(product)}
                > <i className="fa fa-trash-alt fa-lg"></i></button>  
    </td>
        </tr>
    ))}
</tbody>
         </> ) : <><Popup>No item has been added.</Popup>
       <Link to="/add-product">  <button type="button" 
         style={{backgroundColor:"orangered",marginLeft:"1rem",cursor:"pointer", color:"white" ,padding:"1.5rem 1.5rem"}}
          className="btn-small">Add First Item <i className="fa fa-plus"></i></button></Link> </>}
      </table>
      {/* <div className="pageBtn">
         { [...Array(pages).keys()].map(x=>{
           return (<>
           <Link className={x+1 === page ? "activePage" :""}  key={x+1}
           to={`/product-list/pageNumber/${x+1}`}
           >{x+1}</Link>
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
           to={`/product-list/pageNumber/${x+1}`}
           >{x+1}</Link>
          
             

           </SwiperSlide>

       </>
       )

         
       })}
           </Swiper>
       </div>
      </>

      )
    }
    </ProjectSectionStyles>
)

}

export default ProductListPage;