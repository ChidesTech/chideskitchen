import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_DELIVERY_INFO, CART_SAVE_PAYMENT_METHOD, WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM} from "../redux-constants/cartConstants";

export const addToCart=(prodId, qty)=>async (dispatch, getState)=>{
   const {data} = await Axios.get(`/api/products/${prodId}`);
   dispatch({
       type: CART_ADD_ITEM,
       payload:{
           name: data.name,
           image:data.image,
           price: data.price,
           stock: data.stock,
           product: data._id,
           qty
       }
   });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(prodId)=> (dispatch, getState)=>{
   dispatch({
       type: CART_REMOVE_ITEM,
       payload: prodId
   });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
export const saveDeliveryInfo=(data)=>(dispatch)=>{
   dispatch({
       type: CART_SAVE_DELIVERY_INFO,
       payload: data
   });
   localStorage.setItem("deliveryInfo", JSON.stringify(data));

}
export const savePaymentMethod=(data)=> (dispatch)=>{
   dispatch({
       type: CART_SAVE_PAYMENT_METHOD,
       payload: data,
   });

}
export const addToWishlist=(prodId)=>async (dispatch, getState)=>{
    const {data} = await Axios.get(`/api/products/${prodId}`);
    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload:{
            name: data.name,
            image:data.image,
            product: data._id,
            price : data.price

        }
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().cart.wishlistItems))
 }
 export const removeFromWishlist=(prodId)=> (dispatch, getState)=>{
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: prodId
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().cart.wishlistItems));
 }
 
 