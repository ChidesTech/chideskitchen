import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import{BrowserRouter, Route, Link} from "react-router-dom";
import { signout } from "./redux-actions/userActions";
import Sidebar from "./components/SideBar";
import CartPage from "./views/CartPage";
import DeliveryPage from "./views/DeliveryPage";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import OrderDetailsPage from "./views/OrderDetailsPage";
import OrderHistoryPage from "./views/OrderHistoryPage";
import PaymentPage from "./views/PaymentPage";
import PlaceOrderPage from "./views/PlaceOrderPage";
import ProductPage from "./views/ProductPage";
import ProfilePage from "./views/ProfilePage";
import SignupPage from "./views/SignupPage";
import WishListPage from "./views/WishListPage";
import ReservationPage from "./views/ReservationPage";
import PrivateRoute from './components/PrivateRoute';
import * as BsIcons from "react-icons/bs";
import AdminRoute from "./components/AdminRoute";
import ProductListPage from "./views/ProductListPage";
import ProductEditPage from "./views/ProductEditPage";
import CategoryEditPage from "./views/CategoryEditPage";
import ProductAddPage from "./views/ProductAddPage";
import CategoryAddPage from "./views/CategoryAddPage";
import OrderListPage from "./views/OrderListPage";
 import ReservationListPage from "./views/ReservationListPage";
import CategoryListPage from "./views/CategoryListPage";
import UserListPage from "./views/UserListPage";
import UserEditPage from "./views/UserEditPage";
import Search from "./components/Search";
import SearchPage from "./views/SearchPage";
import { useEffect } from "react";
import { listProductCategories } from "./redux-actions/productActions";
import DashboardPage from "./views/DashboardPage";
import ScrollToTop from "./components/ScrollToTop";
import MobileSearchPage from "./views/MobileSearchPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const [open, setOpen] = useState(false);
  const cart = useSelector(state=>state.cart);
   const {cartItems} = cart
  const wishlist = useSelector(state=>state.cart);
   const {wishlistItems} = wishlist

   const userSignin = useSelector(state => state.userSignin);
   const {userInfo} = userSignin;
   const dispatch = useDispatch()
   const logoutHandler=()=>{
     dispatch(signout())
   }
useEffect(()=>{
  
  dispatch(listProductCategories())
},[dispatch]);


  return ( 
  <BrowserRouter>
  <ScrollToTop></ScrollToTop>
  <div>
  <img className="telegram" style={{zIndex:"7", position:"fixed",right:"2%", height:"8rem", width:"8rem", borderRadius:"50%"}} alt="a" 
    src="/telegram.jpeg"/>
  </div>
  <div>
  <img alt="a" className="whatsapp" style={{zIndex:"7", position:"fixed",right:"2%", height:"8rem", width:"8rem", borderRadius:"50%"}} 
    src="/whatsapp.jpeg"/>
  </div>
  <div>
    <img alt="a" className="chat" style={{zIndex:"7", position:"fixed", top:"80%",right:"2%", height:"8rem", width:"8rem", borderRadius:"12%"}} 
    src="/chat.jpeg"/>
  </div>
  <div id="search-popup" className="search-popups" style={{position:"fixed", top:"30%", width:"85%", left:"2%", right:"2%"}}>
    <div className="search-close fa fa-close" style={{float:"right",marginLeft:"3rem", fontSize:"2.5rem", color:"black", padding:"16px"}}></div>
    <br/>
    <br/>
    <br/>
    <br/>
  <Route className="search-close" style={{alignSelf:"center" }} render={({history})=> <Search history={history}></Search>} />
  </div>
   <div className="bottom-nav">
   <Link to="/search-product" className="nav-div" style={{fontSize:"2.3rem", marginLeft:"1rem"}} >
     <span style={{color:"orangered"}} className="fa fa-search search-mini"></span>
      <span style={{fontSize:"1.4rem", color:"orangered"}}> Search</span>
      </Link>

   <div className="nav-div" >   <Link   onClick={()=> setOpen(false)} className="float" to="/cart">
           {/* <span className="name"> Cart</span> */}
           <span  className="fa fa-shopping-cart"  style={{ fontSize:"2.3rem", color:"orangered" }} alt=""/>
         
           <span  className="cart-count" style={{background:"orangered", color:"black"}}>{cartItems.length}</span>
           <span style={{fontSize:"1.4rem", marginLeft:"-2.3rem", display:"block", color:"orangered"}}> Cart</span>
         </Link>
        
         </div>
   <div className="nav-div" > 
     <Link to="/wishlist">
           <span  style={{fontSize:"2.4rem", color:"orangered", marginRight:"3px"}} className=" fa fa-heart"></span>
           <span style={{fontWeight:"bold", color:"orangered"}}>{wishlistItems.length}</span>
         <span style={{fontSize:"1.4rem", display:"block", color:"orangered"}}> Wishlist</span>

           </Link>

           </div>

           <div className="nav-div chat-mobile">
             <span style={{fontSize:"2.8rem", color:"orangered"}} className="fas fa-comment-dots"></span>
         <span style={{fontSize:"1.4rem", color:"orangered"}}> Chat</span>

           </div>
    
   </div>
    <div id="grid-container"  className="grid-container">

      
    {/* <header className="header-row" onClick={()=> setOpen(false)}>
        <div><Link className="brand" to="/"> ChideStore</Link></div>
        <Route render={({history})=> <Search history={history}></Search>} />
    </header>   */}
   
    <nav className="row" >
  <div style={{display:"flex"}}>
    <div onClick={()=> setOpen(false)}>
      { userInfo && userInfo.isAdmin &&
     <Sidebar ></Sidebar>
      }
      {  
      (userInfo &&  !userInfo.isAdmin)  &&
      <Sidebar></Sidebar>
    }

    {!userInfo  && <Sidebar></Sidebar>}

</div>
<Link style={{color:"white", display:"inline"}} className="brand" to="/"><i className="flaticon-plate7"></i> ChidesKitchen</Link>
</div>
<div className="search-hide">
        <Route  render={({history})=> <Search  history={history}></Search>} />
        </div>
    <div  className="right-nav">
         <Link   onClick={()=> setOpen(false)} className="float link " to="/cart">
           {/* <span className="name"> Cart</span> */}
           <img src="/cart.svg" style={{height:"2.3rem", marginBottom:"-3px",marginLeft:"-.2rem" }} alt=""/>
        
           <span  className="cart-count">{cartItems.length}</span>
         
         </Link>
         <Link   onClick={()=> setOpen(false)} className="float link" to="/wishlist">
           {/* <span className="name"> Cart</span>
           <img src="/cart.svg" style={{height:"2.3rem", marginBottom:"-3px",marginLeft:"-.2rem" }} alt=""/>
         */}
         <span style={{ marginRight:"2rem"}}>
           <span  style={{fontSize:"2.3rem"}} className=" fa fa-heart"></span>
           <span style={{fontWeight:"bold", marginLeft:"2px"}}>{wishlistItems.length}</span>
           </span>
         </Link>
         
         {
           userInfo? 
           (
           <div className="dropdown">
             <div  >
             <BsIcons.BsFillPersonFill  onClick={()=> setOpen(!open)} style={{fontSize:"3rem", marginBottom:"-.5rem",color:"white"}} />
            <Link className="name"  onClick={()=> setOpen(!open)} to="#">
                {userInfo.name}{!open ?<i style={{ marginLeft:".5rem"}} className="fa fa-caret-down"></i> : 
              <i style={{ marginLeft:".5rem"}} className="fa fa-caret-up"></i>}
                </Link>
                </div>
               {open && <div style={{paddingLeft:0, justifyContent:"center", display:"flex"}} className="dropdown-content"  onClick={()=> setOpen(!open)}>
              {/* <li><Link className="logout" to="/wishlist" ><i className="fa fa-heart"> Wishlist</i></Link></li>  */}
              <div style={{marginTop:"1rem"}} ><Link className="logout" to="/order-history" ><i className="fas fa-clipboard"> History</i></Link></div> 
              <div ><Link className="logout" to="/account"><i className="fa fa-cog"> Account </i> </Link></div> 
              <div style={{marginBottom:"1.5rem"}} ><a className="logout" href="/" onClick={logoutHandler}> <i className="fas  fa-sign-out-alt"> Logout</i> </a></div> 
             </div>}
             
           </div>
             )
           :
           (<>
           
           <Link className="float" style={{fontWeight:"bold", marginRight:"1rem", overflow:"hidden"}} to="/login">Login</Link>
           </>
           )
         }
          
     </div>
    {/* <Sidebar></Sidebar> */}

      </nav>



    <main  onClick={()=> setOpen(false)}>

      <Route path="/search-product" exact component={MobileSearchPage}/>
      <Route path="/search/product/:name?" exact component={SearchPage}/>
      <Route path="/search/category/:category" exact component={SearchPage}/>
      <Route path="/search/category/:category/product/:name/pageNumber/:pageNumber" exact component={SearchPage}/>
      <Route path="/order/:id?" component={OrderDetailsPage}/>
      <Route path="/wishlist/:id?" component={WishListPage}/>
      <Route path="/cart/:id?" component={CartPage}/>
      <Route path="/product/:id" exact component={ProductPage}/>
      <Route path="/add-product" exact component={ProductAddPage}/>
      {/* <Route path="/add-product" exact component={ProductAddPage}/> */}
      <Route path="/category/:id/add" exact component={CategoryAddPage}/>
      <Route path="/add-category" exact component={CategoryAddPage}/>
      <Route path="/product/:id/edit" exact component={ProductEditPage}/>
      <Route path="/category/:id/edit" exact component={CategoryEditPage}/>
      <Route path="/order-history" component={OrderHistoryPage}/>
      <Route path="/order-now" component={PlaceOrderPage}/>
      <Route path="/payment-method" component={PaymentPage}/>
      <Route path="/delivery" component={DeliveryPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/login" component={LoginPage}/>
      <PrivateRoute  path="/account"
            component={ProfilePage}
          ></PrivateRoute>
      <PrivateRoute  path="/reservations"
            component={ReservationPage}
          ></PrivateRoute>
      {/* <Route path="/account" component={ProfilePage}/> */}
      <AdminRoute path="/user/:id/edit" exact component={UserEditPage}/>
      <AdminRoute path="/dashboard" exact component={DashboardPage}/>

      <AdminRoute path="/category-list"
        component={CategoryListPage}
        >
      </AdminRoute>
      <AdminRoute path="/users"
        component={UserListPage}
        >
      </AdminRoute>
      <AdminRoute path="/product-list/pageNumber/:pageNumber"
        component={ProductListPage} exact
        >
      </AdminRoute>
      <AdminRoute path="/product-list"
        component={ProductListPage}
       exact >
      </AdminRoute>

     
     
      <AdminRoute path="/reservation-list"
        component={ReservationListPage}
        >
      </AdminRoute>
      <AdminRoute path="/order-list"
        component={OrderListPage}
        >
      </AdminRoute>
       <Route path="/pageNumber/:pageNumber"   component={HomePage}
        exact/>
       <Route path="/"   component={HomePage}
        exact/>
    
    </main> 
    <footer className="footer" onClick={()=> setOpen(false)}>
      
     <div className="footer-container">
<div className="footer-row">
  <div className="footer-col">
    <h4>Important Links</h4>
    <ul>
      <li><a href="/">Partner With Us</a></li>
      <li><a href="/order-history">Orders</a></li>
      <li><a href="/">Privacy Policy</a></li>
     <li><a href="/account">Account</a></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>Affiliate Programs</h4>
    <ul>
      <li><a href="https://chideskitchen.herokuapp.com">ChidesKitchen</a></li>
      <li><a href="test.js">Chides Technologies</a></li>
      <li><a href="test.js">ChidesLands</a></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>Follow Us On</h4>
    <div  className="socials">
      <a href="test.js"><i className="fab fa-facebook-f"></i></a>
      <a href="test.js"><i className="fab fa-twitter"></i></a>
      <a href="test.js"><i className="fab fa-instagram"></i></a>
      <a href="test.js"><i className="fab fa-linkedin-in"></i></a>
    </div>
  </div>
  <div className="footer-col">
    <h4>Subscribe to our NewsLetter</h4>
    <ul>
      <li><input style={{backgroundColor: "transparent"
       , padding:"1rem 1.6rem", border:"1px solid white", fontSize:"1.5rem", color:"white"}} type="email" placeholder="Email"/></li>
      <li><button style={{backgroundColor: "orangered", cursor:"pointer", color:"white", padding:"1rem", border:"1px solid orangered", borderRadius:"3px"}} >Submit</button></li>
    </ul>
  </div>
</div>
     </div>
      </footer>
      <a href="https://chidestech.com.ng">
      <div className="copyright row center">By ChidesTechnologies @2021</div>
      </a>
      
 </div>
 </BrowserRouter>
 
 );
}

export default App;
