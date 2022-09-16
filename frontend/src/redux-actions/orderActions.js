import axios from "axios";
import { CART_EMPTY } from "../redux-constants/cartConstants";
import {RESERVATION_CREATE_FAIL, RESERVATION_CREATE_REQUEST, RESERVATION_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
   ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,
   ORDER_PERSONAL_FAIL,
    ORDER_PERSONAL_REQUEST,
    ORDER_PERSONAL_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    RESERVATION_LIST_REQUEST,
    RESERVATION_LIST_SUCCESS,
    RESERVATION_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    RESERVATION_DELETE_REQUEST,
    RESERVATION_DELETE_SUCCESS,
    RESERVATION_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL} from "../redux-constants/orderConstants"



export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.post(`/api/orders`, order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const createReservation = (fullName, date, time, numPersons) => async (dispatch, getState) => {
    dispatch({ type: RESERVATION_CREATE_REQUEST, payload: {fullName, date, time, numPersons} });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.post(`/api/reservations`, {fullName, date, time, numPersons}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: RESERVATION_CREATE_SUCCESS, payload: data.reservation });
     
    } catch (error) {
      dispatch({
        type: RESERVATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
   


export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: {order, paymentResult} });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/orders/${order._id}/pay`,paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};
   

export const listOrderPersonal = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_PERSONAL_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/personal`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    
    dispatch({ type: ORDER_PERSONAL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PERSONAL_FAIL, payload: message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};
export const listReservations = () => async (dispatch, getState) => {
  dispatch({ type: RESERVATION_LIST_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/reservations`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: RESERVATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: RESERVATION_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const deleteReservation = (orderId) => async (dispatch, getState) => {
  dispatch({ type: RESERVATION_DELETE_REQUEST});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/reservations/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: RESERVATION_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: RESERVATION_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: {orderId} });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/deliver`,{}, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};