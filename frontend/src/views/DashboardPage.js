import React from "react" ;
import styled from '@emotion/styled'


const DashboardStyle = styled.div`

   
  
 
 
 
 
 
 main{
    
     padding: 2rem 1.5rem;
     background-color: black;
     min-height: calc(100vh - 90px);
     font-weight:bold;
 }
 
 .cards{
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     grid-gap: 2rem;
     margin-top: 1rem;
     background: black;
 }
 
 .card-single{
     display: flex;
     justify-content: space-between;
     background-color: red;
     padding: 3rem;
     border-radius: 5px;
 }
 
 
 
 
 
 
 
 
 .card-single h1{
     color: white;
     font-size:3rem;
 }
 
 
 .card-single div:last-child span{
    color: white;
    font-size: 5rem;
 }
 
 
 .card-single div:first-of-type span{
     color: white;
    font-size: 2rem;


 }
 
 @media only screen and (max-width: 1200px){
     .main-content{
         margin-left: 70px;
     }
     .main-content header{
         width: calc(100% - 70px);
         left: 70px;
     }
    
 }
 
 @media only screen and (max-width: 960px){
   .cards{
   grid-template-columns: repeat(3,1fr);
   }
   
 
 }
 @media only screen and (max-width: 768px){
   .cards{
   grid-template-columns: repeat(2,1fr);
   }
   .card-single h1{
    color: white;
    font-size: 2rem;
}

.card-single div:first-of-type span{
    color: white;
    font-size: 1.6rem;

}
 
 .main-content{
     width: 100%;
     margin-left: 0rem;
 }
   
 }
 @media only screen and (max-width: 560px){
   .cards{
   grid-template-columns: 100%;
   
   }
   
 }
 
 
 
 




`
const DashboardPage = ()=>{
    return(<DashboardStyle>

    <div className="main-content">
        
        <main>
            <div className="cards">
                
                <div style={{backgroundColor : "#DD2F6E", border:"2px solid #DD2F6E"}} className="card-single">
                    <div>
                        <h1 style={{color: "white"}}>24</h1>
                        <span style={{color: "white"}}>Users</span>
                    </div>
                    <div><span  style={{color: "white"}} className="fa fa-users"></span></div>
                </div>
               
                <div style={{backgroundColor: "navy", border: "2px solid navy" }}className="card-single">
                    <div>
                        <h1>15</h1>
                        <span>Categories</span>
                    </div>
                    <div><span className="fa fa-clipboard"></span></div>
                </div>

                <div style={{backgroundColor: "green",border: "2px solid green"}} className="card-single">
                    <div>
                        <h1>78</h1>
                        <span>Products</span>
                    </div>
                    <div><span className="fa fa-shopping-cart"></span></div>
                </div>
               
                <div style={{backgroundColor: "purple",border: "2px solid purple",}} className="card-single">
                    <div>
                        <h1>4</h1>
                        <span>Orders</span>
                    </div>
                    <div><span className="far fa-clipboard"></span></div>
                </div>
               
                <div style={{backgroundColor: "white",border: "2px solid red"}} className="card-single">
                    <div>
                        <h1 style={{color: "red"}}>14</h1>
                        <span style={{color: "red"}}>Sellers</span>
                    </div>
                    <div><span style={{color: "red"}} className="fa fa-users"></span></div>
                </div>
               
                <div style={{border: "2px solid red"}} className="card-single">
                  
                    <div>
                        <h1>₦40,000</h1>
                        <span   >Sales</span>
                    </div>
                   
                    <div style={{marginLeft: "1rem"}} ><span className="fas fa-money-bill-wave" > </span></div>
                </div>
              
            </div>
        </main>
    </div>
    </DashboardStyle>
    )
}


export default DashboardPage;