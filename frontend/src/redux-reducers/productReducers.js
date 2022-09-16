import {  CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_RESET, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_RESET, CATEGORY_DELETE_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_RESET, CATEGORY_UPDATE_SUCCESS, PRODUCTS_CATEGORY_LIST_FAIL, PRODUCTS_CATEGORY_LIST_REQUEST, PRODUCTS_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,  PRODUCT_LIST_REQUEST,  PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS, REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_RESET, REVIEW_CREATE_SUCCESS } from "../redux-constants/productConstants";

export const productListReducer = ( state = {loading: true, products: [] }, action) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
      return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products , pages: action.payload.pages, page: action.payload.page}
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload}
            default :
            return state;
    }
}
export const productCategoryListReducer = ( state = {loading: true, categories: [] }, action) =>{
    switch(action.type){
        case PRODUCTS_CATEGORY_LIST_REQUEST:
      return { loading: true };
        case PRODUCTS_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload}
        case PRODUCTS_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload}
            default :
            return state;
    }
}
export const productDetailsReducer = (state = { loading:true }, action) =>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload}
            default :
            return state;
    }
}
export const productCreateReducer = (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false,success:true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {};

            default :
            return state;
    }
}
export const productUpdateReducer = (state={}, action) =>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false,success:true}
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
                return {};
          default :
            return state;
    }
}
export const productDeleteReducer = (state={}, action) =>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false,success:true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error: action.payload};
            case PRODUCT_DELETE_RESET:
                return {};
            default :
            return state;
    }
}

export const categoryListReducer = ( state = {loading: true, categories: [] }, action) =>{
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
      return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload}
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload}
            default :
            return state;
    }
}

export const categoryCreateReducer = (state = {}, action) =>{
    switch(action.type){
        case CATEGORY_CREATE_REQUEST:
            return {loading:true}
        case CATEGORY_CREATE_SUCCESS:
            return {loading: false,success:true, category: action.payload}
        case CATEGORY_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case CATEGORY_CREATE_RESET:
            return {};

            default :
            return state;
    }
}

export const categoryDetailsReducer = (state = { loading:true }, action) =>{
    switch(action.type){
        case CATEGORY_DETAILS_REQUEST:
            return {loading:true}
        case CATEGORY_DETAILS_SUCCESS:
            return {loading: false, category: action.payload}
        case CATEGORY_DETAILS_FAIL:
            return {loading:false, error: action.payload}
            default :
            return state;
    }
}

export const categoryUpdateReducer = (state={}, action) =>{
    switch(action.type){
        case CATEGORY_UPDATE_REQUEST:
            return {loading:true}
        case CATEGORY_UPDATE_SUCCESS:
            return {loading: false,success:true}
        case CATEGORY_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case CATEGORY_UPDATE_RESET:
                return {};
          default :
            return state;
    }
}
export const categoryDeleteReducer = (state={}, action) =>{
    switch(action.type){
        case CATEGORY_DELETE_REQUEST:
            return {loading:true}
        case CATEGORY_DELETE_SUCCESS:
            return {loading: false,success:true}
        case CATEGORY_DELETE_FAIL:
            return {loading:false, error: action.payload};
            case CATEGORY_DELETE_RESET:
                return {};
            default :
            return state;
    }
}

export const reviewCreateReducer = (state = {}, action) =>{
    switch(action.type){
        case REVIEW_CREATE_REQUEST:
            return {loading:true}
        case REVIEW_CREATE_SUCCESS:
            return {loading: false,success:true, review: action.payload}
        case REVIEW_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case REVIEW_CREATE_RESET:
            return {};

            default :
            return state;
    }
}