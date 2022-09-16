import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./redux-reducers/cartReducers";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer, orderPersonalReducer, reservationCreateReducer, reservationDeleteReducer, reservationListReducer } from "./redux-reducers/orderReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer, productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer, reviewCreateReducer } from "./redux-reducers/productReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer, userUpdateReducer} from "./redux-reducers/userReducers";

const initialState ={
    userSignin:{
        userInfo: localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")): null
    },
    cart:{
        cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        wishlistItems: localStorage.getItem("wishlistItems")?JSON.parse(localStorage.getItem("wishlistItems")):[],
        deliveryInfo: localStorage.getItem("deliveryInfo")?JSON.parse(localStorage.getItem("deliveryInfo")):{},
        paymentMethod: "PayPal",

        
    }
};


const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderPersonal : orderPersonalReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  reservationCreate: reservationCreateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList : orderListReducer,
  reservationList : reservationListReducer,
  orderDelete: orderDeleteReducer,
  reservationDelete: reservationDeleteReducer,
  orderDeliver: orderDeliverReducer,
  categoryList : categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  userList : userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productCategoryList : productCategoryListReducer,
  reviewCreate: reviewCreateReducer
,





    
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));


export default store;