import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  detailsCategory, updateCategory } from "../redux-actions/productActions";
import {  LinearProgress} from "@material-ui/core";
import Popup from "../components/Popup";
import { CATEGORY_UPDATE_RESET } from "../redux-constants/productConstants";


const CategoryEditPage =(props)=>{
   const categoryId = props.match.params.id;
   const [name, setName] = useState('');
   

   const categoryDetails = useSelector(state=>state.categoryDetails);
   const {loading, error, category} = categoryDetails;
   const categoryUpdate = useSelector(state=>state.categoryUpdate);
   const {loading: loadingUpdate, error: errorUpdate,success: successUpdate} = categoryUpdate;
   const dispatch = useDispatch();
   useEffect(()=>{

    if(successUpdate){
   props.history.push("/category-list");

    }
       if(!category || category._id !== categoryId || successUpdate){
        dispatch({type:CATEGORY_UPDATE_RESET});

        dispatch(detailsCategory(categoryId))

       }else{
           setName(category.name);
          
       }
   },[dispatch, category, categoryId, props, successUpdate]);

  
   const back=(category)=>{
props.history.push("/category-list");
}

   const submitHandler=(event)=>{
   event.preventDefault();
   dispatch(updateCategory({_id: categoryId, name}));
   }
   return <>
   {loadingUpdate && <LinearProgress
             style={{margin:"1% 30%", color:"blue"}}
            
             color="primary"
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
               <div style={{marginBottom:"-3rem", textAlign:"center"}} className=""><h2>Category Details</h2></div>
          <div >
              <label  htmlFor="name" >Name</label>
              <input type="text" id="name" required placeholder="Enter Category Name" value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          
          
          <div style={{display:"flex",justifyContent:"space-between" ,flexDirection:"row-reverse", marginTop:"1rem"}} >
              <button style={{width:"40%"}} type="submit" className="btn">Done</button>
              <button onClick={()=>back(categoryId)} style={{width:"40%", backgroundColor:"transparent", borderColor:"transparent", color:"orangered", boxShadow:"1px 1px 1px 1px orangered"}} type="button" className="btn">Cancel</button>

          </div>
         
          </form>
          )
          }
  
   </>

}

export default CategoryEditPage;