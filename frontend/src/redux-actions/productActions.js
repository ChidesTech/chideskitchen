import Axios from "axios";
import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, PRODUCTS_CATEGORY_LIST_FAIL, PRODUCTS_CATEGORY_LIST_REQUEST, PRODUCTS_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS } from "../redux-constants/productConstants"

export const listProducts = ({pageNumber ='', name = '', category=''}) => async (dispatch) =>{
   dispatch({
       type: PRODUCT_LIST_REQUEST
   });
   try{
    const {data} = await Axios.get(`/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}`);
   dispatch({
       type: PRODUCT_LIST_SUCCESS,
       payload: data
   })
   }catch(error){
    dispatch({
        type: PRODUCT_LIST_FAIL, payload:error.message
    })
   }
   }

   


   export const detailsProduct = (prodId) =>async(dispatch)=>{
   dispatch({
       type: PRODUCT_DETAILS_REQUEST, payload: prodId
   });
   try {
       const {data} =await Axios.get(`/api/products/${prodId}`);
       dispatch({type: PRODUCT_DETAILS_SUCCESS, 
       payload: data})
   } catch (error) {
      dispatch({type:PRODUCT_DETAILS_FAIL,
       payload: error.response && error.response.data.message? error.response.data.message: error.message})
   }
   }

   export const createProduct =(product)=> async(dispatch, getState)=>{
      
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    });
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await Axios.post(`/api/products`,product,{
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({
            type: PRODUCT_CREATE_SUCCESS, payload: data.product
        });
    } catch (error) {
        dispatch({type:PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message})
        
    }
   }
   export const updateProduct =(product)=> async(dispatch, getState)=>{
    dispatch({
        type: PRODUCT_UPDATE_REQUEST, payload: product
    });
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await Axios.put(`/api/products/${product._id}`,product,{
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type:PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message})
        
    }
   }
   export const deleteProduct =(productId)=> async(dispatch, getState)=>{
    dispatch({
        type: PRODUCT_DELETE_REQUEST, payload: productId
    });
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/api/products/${productId}`,{
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({
            type: PRODUCT_DELETE_SUCCESS, payload:data
        });
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message})
        
    }
   }


   export const listCategories = () => async (dispatch) =>{
    dispatch({
        type: CATEGORY_LIST_REQUEST
    });
    try{
     const {data} = await Axios.get(`/api/categories`);
    dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data
    })
    }catch(error){
     dispatch({
         type: CATEGORY_LIST_FAIL, payload:error.message
     })
    }
    }

    export const createCategory =(category)=> async(dispatch, getState)=>{
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        });
        const {userSignin:{userInfo}} = getState();
        try {
            const {data} = await Axios.post(`/api/categories`,category,{
                headers: {
                  Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({
                type: CATEGORY_CREATE_SUCCESS, payload: data.category
            });
        } catch (error) {
            dispatch({type:CATEGORY_CREATE_FAIL,
                payload: error.response && error.response.data.message? error.response.data.message: error.message})
            
        }
       }

       export const detailsCategory = (categoryId) =>async(dispatch)=>{
        dispatch({
            type: CATEGORY_DETAILS_REQUEST, payload: categoryId
        });
        try {
            const {data} =await Axios.get(`/api/categories/${categoryId}`);
            dispatch({type: CATEGORY_DETAILS_SUCCESS, 
            payload: data})
        } catch (error) {
           dispatch({type:CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message})
        }
        }

        export const updateCategory =(category)=> async(dispatch, getState)=>{
            dispatch({
                type: CATEGORY_UPDATE_REQUEST, payload: category
            });
            const {userSignin:{userInfo}} = getState();
            try {
                const {data} = await Axios.put(`/api/categories/${category._id}`,category,{
                    headers: {
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                })
                dispatch({
                    type: CATEGORY_UPDATE_SUCCESS, payload: data
                });
            } catch (error) {
                dispatch({type:CATEGORY_UPDATE_FAIL,
                    payload: error.response && error.response.data.message? error.response.data.message: error.message})
                
            }
           }
           export const deleteCategory =(categoryId)=> async(dispatch, getState)=>{
            dispatch({
                type: CATEGORY_DELETE_REQUEST, payload: categoryId
            });
            const {userSignin:{userInfo}} = getState();
            try {
                const {data} = await Axios.delete(`/api/categories/${categoryId}`,{
                    headers: {
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                })
                dispatch({
                    type: CATEGORY_DELETE_SUCCESS, payload:data
                });
            } catch (error) {
                dispatch({type:CATEGORY_DELETE_FAIL,
                    payload: error.response && error.response.data.message? error.response.data.message: error.message})
                
            }
           }
        

           export const listProductCategories = () => async (dispatch) =>{
            dispatch({
                type: PRODUCTS_CATEGORY_LIST_REQUEST
            });
            try{
             const {data} = await Axios.get(`/api/products/categories`);
            dispatch({
                type: PRODUCTS_CATEGORY_LIST_SUCCESS,
                payload: data
            })
            }catch(error){
             dispatch({
                 type: PRODUCTS_CATEGORY_LIST_FAIL, payload:error.message
             })
            }
            }
            export const createReview =(prodId, review)=> async(dispatch, getState)=>{
                dispatch({
                    type: REVIEW_CREATE_REQUEST
                });
                const {userSignin:{userInfo}} = getState();
                try {
                    const {data} = await Axios.post(`/api/products/${prodId}/reviews`,review,{
                        headers: {
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                    })
                    dispatch({
                        type: REVIEW_CREATE_SUCCESS, payload: data.review
                    });
                } catch (error) {
                    dispatch({type:REVIEW_CREATE_FAIL,
                        payload: error.response && error.response.data.message? error.response.data.message: error.message})
                    
                }
               }