import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux-actions/productActions";
import {  LinearProgress} from "@material-ui/core";
import { PRODUCT_CREATE_RESET } from "../redux-constants/productConstants";
import Compressor from 'compressorjs';
import { Link } from "react-router-dom";


const ProductAddPage =(props)=>{
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [countInStock] = useState('');
   const [image, setImage] = useState('');
   const [category, setCategory] = useState('');
   const [description, setDescription] = useState('');
   const categoryList = useSelector(state=>state.categoryList);
   const {loading: loadingCategory, error: errorCategory, categories}= categoryList;
  
   const productCreate = useSelector(state=>state.productCreate);
   const {  success: successCreate, product: createdProduct}= productCreate;
   const dispatch = useDispatch();
   useEffect(()=>{
        
    if(successCreate){
       
        dispatch({type: PRODUCT_CREATE_RESET});
        props.history.push(`/product-list`);
    }
    
},[dispatch,createdProduct,props.history, successCreate])

   const [uploading, setUploading] = useState(false);
   const [errorUpload] = useState("");
  //  const {userInfo} = userSignin;
  //  const [compressedFile, setCompressedFile] =  useState(null);

   const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
            
        uploadImage(compressedResult);
      },
    });
    //  previewFile(file)
  };

  const uploadImage= async(base64Encodedimage)=>{
    setUploading(true)
    const data = new FormData()
    data.append("file", base64Encodedimage);
    data.append("upload_preset", "chidespencils");
    data.append("cloud_name","chidestech");
    fetch("https://api.cloudinary.com/v1_1/chidestech/image/upload",{method:"post",body: data})
    .then(resp => resp.json())
    .then(data => {setImage(data.url)
    setUploading(false);}
    ).catch(err => {console.log(err);
      setUploading(false);
    });

    
    }

    

   const submitHandler=(event)=>{
   event.preventDefault();
   dispatch(createProduct({ name, price, image, category, description, countInStock}));
   }
   return <>
   
  
            <form   onSubmit={submitHandler}
            className="form">
               <div style={{marginBottom:".5rem", textAlign:"center"}} className=""><h2>Product Details</h2></div>
              
          <div >

              <label style={{cursor:"pointer"}} htmlFor="imageFile" >
                <span className="btn-small "> <i className="fa fa-image"></i> Pick An Image</span>
               
              </label>
              {/* <input type="file" id="imageFile" label="Choose Product" name="" onChange={uploadFileHandler}/> */}
               <input style={{border:"none", display:"none"}} type="file" label="Choose Product" id="imageFile"  onChange={handleFileInputChange}/> 
          </div>
          <div >
              <input 
              // readOnly
               type="text"  id="image"
               required 
               placeholder="Enter Product Image"
               value={image} onChange={(e)=> setImage(e.target.value)}/>
               {uploading &&  <LinearProgress style={{marginTop:"2%",marginBottom:"-1rem"}} /> }
            {errorUpload && <h4 style={{color:"red", textAlign:"center", marginTop:"1rem", marginBottom:"1rem"}}>
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
              <input type="number" min="0" id="countInStock" required placeholder="Enter Number Of Product Available" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}/>
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

{categories.length>0 ? categories.map(category=>(<option style={{padding:"1rem", fontSize:"1.6rem"}}  value={category.name}>{category.name}</option>)
   )
   : 
   <option style={{padding:"1rem", fontSize:"1.6rem"}}  value="">No Category Added Yet</option>
   
   }
   </>}


              </select>
 {/* <input type="text" id="category" required placeholder="Enter Product Category" value={category} onChange={(e)=> setCategory(e.target.value)}/> */}
          </div>
          
          
          <div style={{display:"flex",justifyContent:"space-between" ,flexDirection:"row-reverse", marginTop:"1rem"}} >
              <button style={{width:"40%"}} type="submit" className="btn">Done</button>
              <Link to="/product-list" style={{width:"40%", backgroundColor:"transparent",textAlign: "center",  borderColor:"transparent", color:"orangered", boxShadow:"1px 1px 1px 1px orangered"}} type="button" className="btn">Cancel</Link>

          </div>
         
          </form>
          
          
  
   </>

}

export default ProductAddPage;