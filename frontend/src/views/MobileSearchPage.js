import React from 'react';
import{Route, Link} from "react-router-dom";
import Search from '../components/Search';


 const MobileSearchPage = (props) => {
  
  return (
    
   <>
   <div style={{width:"100%"}}>
        <Route  render={({history})=> <Search  history={history}></Search>} />
        </div>
<br/>
<br/>
        <Link to="/" style={{float:"right", background:"red", color:"white", padding:"1%", borderRadius:"10%"}} href="/">Go Back</Link>
   </>
  );
}


export default MobileSearchPage;