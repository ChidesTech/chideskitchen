import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../redux-actions/productActions";
import { CATEGORY_CREATE_RESET } from "../redux-constants/productConstants";
import { Link } from "react-router-dom";


const CategoryAddPage =(props)=>{
   const [name, setName] = useState('');
   const categoryCreate = useSelector(state=>state.categoryCreate);
    const {  success: successCreate}= categoryCreate;
   const dispatch = useDispatch();
   useEffect(()=>{
    if(successCreate){
           
      dispatch({type: CATEGORY_CREATE_RESET});
      props.history.push(`/category-list`);
  }
    
       
   },[dispatch,props.history, successCreate]);

  
   

   const submitHandler=(event)=>{
   event.preventDefault();
   dispatch(createCategory({ name}));
   }
   return <>
   
           
    

            <form   onSubmit={submitHandler}
            className="form">
               <div style={{ textAlign:"center"}} className=""><h2>Category Details</h2></div>
          <div >
              <label  htmlFor="name" >Name</label>
              <input type="text" id="name" required placeholder="Enter category name" value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          
          
          <div style={{display:"flex",justifyContent:"space-between" ,flexDirection:"row-reverse", marginTop:"1rem"}} >
              <button style={{width:"40%"}} type="submit" className="btn">Done</button>
              <Link to="category-list" style={{width:"40%",textAlign: "center", backgroundColor:"transparent", borderColor:"transparent", color:"orangered", boxShadow:"1px 1px 1px 1px orangered"}}  className="btn">Cancel</Link>

          </div>
         
          </form>
          
          
  
   </>

}

export default CategoryAddPage;