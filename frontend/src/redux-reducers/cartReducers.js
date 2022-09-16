import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_DELIVERY_INFO, CART_SAVE_PAYMENT_METHOD, WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../redux-constants/cartConstants";

export const cartReducer = (state = {cartItems:[]}, action) =>{
    switch (action.type) {
        case CART_ADD_ITEM:
          const item = action.payload
          const existingItem = state.cartItems.find(x=> x.product=== item.product);
          if(existingItem){
              return{
                  ...state, cartItems: state.cartItems.map(x=> x.product === existingItem.product?item:x)
              }
          }else{
              return {...state, cartItems:[...state.cartItems, item]};
          }
        case WISHLIST_ADD_ITEM:
          const item1 = action.payload
          const existingItem1 = state.wishlistItems.find(x=> x.product=== item1.product);
          if(existingItem1){
              return{
                  ...state, wishlistItems: state.wishlistItems.map(x=> x.product === existingItem1.product?item1:x)
              }
          }else{
              return {...state, wishlistItems:[...state.wishlistItems, item1]};
          }
          case CART_REMOVE_ITEM:
              return {...state, cartItems:state.cartItems.filter(x => x.product !== action.payload)};
          case WISHLIST_REMOVE_ITEM:
              return {...state, wishlistItems:state.wishlistItems.filter(x => x.product!== action.payload)};
              case CART_SAVE_DELIVERY_INFO:
                  return {...state, deliveryInfo: action.payload}
              case CART_SAVE_PAYMENT_METHOD:
                  return {...state, paymentMethod: action.payload}
              case CART_EMPTY:
                  return {...state, cartItems:[]}
        default:
           return state;
    }
}