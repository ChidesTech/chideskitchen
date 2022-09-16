import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsCategory, detailsProduct, updateProduct } from "../redux-actions/productActions";
import {  LinearProgress} from "@material-ui/core";
import Popup from "../components/Popup";
import { PRODUCT_UPDATE_RESET } from "../redux-constants/productConstants";
import axios from "../../node_modules/axios/index";


const ProductEditPage =(props)=>{
   const productId = props.match.params.id;
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [countInStock, setCountInStock] = useState('');
   const [image, setImage] = useState('');
   const [category, setCategory] = useState('');
   const [description, setDescription] = useState('');
   const categoryList = useSelector(state=>state.categoryList);
   const {loading: loadingCategory, error: errorCategory, categories}= categoryList;
   const productDetails = useSelector(state=>state.productDetails);
   const {loading, error, product} = productDetails;
   const productUpdate = useSelector(state=>state.productUpdate);
   const {loading: loadingUpdate, error: errorUpdate,success: successUpdate} = productUpdate;
   const dispatch = useDispatch();
   useEffect(()=>{

    if(successUpdate){
   props.history.push("/product-list");

    }
       if(!product || product._id !== productId || successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET});

        dispatch(detailsProduct(productId))
        dispatch(detailsCategory())

       }else{
           setName(product.name);
           setPrice(product.price);
           setImage(product.image);
           setCategory(product.category);
           setDescription(product.description);
           setCountInStock(product.countInStock);
       }
   },[dispatch, product, productId, props, successUpdate]);

   const [uploading, setUploading] = useState(false);
   const [errorUpload] = useState("");

const handleFileInputChange = (e) => {
    const file = e.target.files[0];
     previewFile(file)
    
  };
  const uploadImage= async(base64Encodedimage)=>{
    setUploading(true)
     axios
       .post(`/api/uploads/cloud`, JSON.stringify({data : base64Encodedimage} ), {
         headers: {
           'Content-Type': 'application/json',
         },
       })
        .then((response) => {
         setImage(response.data);
        setUploading(false);
       })
       .catch((err) => {
         console.log(err);
        setUploading(false);
     });
    }

    const previewFile= (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =()=>{
            
           uploadImage(reader.result);
            
             
        }
        
     }
   const back=(product)=>{
props.history.push("/product-list");
}

   const submitHandler=(event)=>{
   event.preventDefault();
   dispatch(updateProduct({_id: productId, name, price, image, category, description, countInStock}));
   }
   return <>
   {loadingUpdate && <LinearProgress
             style={{margin:"1% 30%"}}
            
           /> }
           {errorUpdate && 
            <Popup variant="danger">{errorUpdate}</Popup>
        }
  {loading ? (
            <LinearProgress
            style={{margin:"10% 30%",height:"2rem"}}
           
          /> 
          ) : error ? (
            <Popup variant="danger">{error}</Popup>
          ) :    (

            <form   onSubmit={submitHandler}
            className="form">
               <div style={{marginBottom:".5rem", textAlign:"center"}} className=""><h2>Edit Product Details</h2></div>
               <div >

              <label htmlFor="imageFile" >
              <span className="btn-small "> <i className="fa fa-image"></i> Pick An Image</span>

              </label>
              {/* <input type="file" id="imageFile" label="Choose Product" name="" onChange={uploadFileHandler}/> */}
              <input style={{border:"none", display:"none"}} type="file" id="imageFile" label="Choose Product" name=""
               onChange={handleFileInputChange}/>
              
          </div>

         
          <div  >
              {/* <label htmlFor="image" >Image</label> */}
              <input readOnly type="text"  id="image"
               required 
               placeholder="Enter Product Image"
               value={image} onChange={(e)=> setImage(e.target.value)}/>
               {uploading &&  <LinearProgress style={{marginTop:"2%",marginBottom:"-1rem"}} /> }
            {errorUpload && <h4 style={{color:"red", textAlign:"center", marginTop:"1rem", marginBottom:"-1rem"}}>
                {errorUpload}
                </h4>}
          </div>

          
          <div >
              <label  htmlFor="name" >Name</label>
              <input type="text" id="name" required placeholder="Enter Product Name" value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div >
              <label htmlFor="price" >Price</label>
              <input type="number" min="0" id="price" required placeholder="Enter Product Price" value={price} onChange={(e)=> setPrice(e.target.value)}/>
          </div>
          {/* <div >
              <label htmlFor="countInStock" >Stock Available</label>
              <input type="number" min="0" id="countInStock" required placeholder="Enter Count In Stock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}/>
          </div> */}
        
        
          <div >
              <label htmlFor="description" >Description</label>
              <textarea style={{border:"2px solid orangered", borderRadius:"8px", fontWeight:"bolder"}} type="text" id="description" rows='3' required placeholder="Enter Product Description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
          
          </div>
          <div >
              <label htmlFor="category" >Category</label>
<select  style={{padding:"1rem", borderRadius:"15px", border:"2px solid orangered",fontWeight:"bolder", outline:"orangered"}} 
 value={category} onChange={(e)=> setCategory(e.target.value)} 
>

<div>Loading Categories ...</div>

   {loadingCategory? 
   <option style={{padding:"1rem", fontSize:"1.6rem"}}  value="">Loading Categories ...</option>:
   errorCategory
   ?
   <option style={{padding:"1rem",   fontSize:"1.6rem"}}  value="">{errorCategory}</option>
   
     : 
    <>
<option style={{padding:"1rem", fontSize:"1.6rem"}}  value="">--Select Category--</option>

    { categories.map(category=>(<option style={{padding:"1rem", fontSize:"1.6rem"}}  value={category.name}>{category.name}</option>
   )
   
   )}
   </>}


              </select>
 {/* <input type="text" id="category" required placeholder="Enter Category" value={category} onChange={(e)=> setCategory(e.target.value)}/> */}
          </div>
          
          
          <div style={{display:"flex",justifyContent:"space-between" ,flexDirection:"row-reverse", marginTop:"1rem"}} >
              <button style={{width:"40%"}} type="submit" className="btn">Done</button>
              <button onClick={()=>back(productId)} style={{width:"40%", backgroundColor:"transparent", borderColor:"transparent", color:"orangered", boxShadow:"1px 1px 1px 1px orangered"}} type="button" className="btn">Cancel</button>

          </div>
          {/* <div >
              <label/>
              <button style={{width:"40%"}} type="button" className="btn">Cancel</button>
          </div> */}
          </form>
          )
          }
  
   </>

}

export default ProductEditPage;