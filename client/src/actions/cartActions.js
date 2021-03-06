import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CART_STATUS, CLOSE_CART } from "../types";
import _ from 'lodash';

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    console.log(cartItems);
    let alreadyExists = false;
    cartItems.forEach(item => {
        if(item._id === product._id){
            alreadyExists = true;
            item.count++;
        }
    });
    if(!alreadyExists){
        cartItems.push({...product, count : 1});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {cartItems, cartIsActive: true}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (product) => (dispatch, getState) => {
    let cartItems = getState().cart.cartItems.slice();
    const productIndex = _.findIndex(cartItems, function(item) { return item._id === product._id; });
    
    console.log(productIndex);
    if(cartItems[productIndex].count > 1){
        cartItems[productIndex].count--;
    }else{
        cartItems = getState().cart.cartItems.slice().filter(item => item._id !== product._id);
    }

    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems, cartIsActive: false}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
export const changeCartStatus = () => (dispatch, getState) => {
    console.log(getState().cart.cartIsActive);
    const cartItems = getState().cart.cartItems.slice();
    const cartIsActive = getState().cart.cartIsActive ? false : true; 
    console.log(cartIsActive);
    dispatch({
        type: CHANGE_CART_STATUS,
        payload: {cartItems,cartIsActive: cartIsActive}
    });
}
export const closeCart = () => (dispatch) => {   
    dispatch({
        type: CLOSE_CART,
        payload: {cartIsActive: false}
    });
}
