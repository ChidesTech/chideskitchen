import React from "react";
import { useState } from "react";


const Search =(props)=>{
    const [name, setName] = useState("");
    const submitHandler=(event)=>{
       event.preventDefault();
      
       props.history.push(`/search/product/${name}`);
    }
    return <div className="search-container">
    <form action="" onSubmit={submitHandler} >
<input type="search" name="search" style={{borderRadius:"12px",border:"1px solid orangered"}} id="search" onChange={(e)=>setName(e.target.value)} placeholder="Search For Foodm Item . . ."/>

<button className="search-close"  onClick={submitHandler} type="submit" ><img className="search search-close" src="/search-solid.svg" style={{height:'4rem', width:"2rem"}} alt=""/></button>
</form>
  </div>
}

export default Search;