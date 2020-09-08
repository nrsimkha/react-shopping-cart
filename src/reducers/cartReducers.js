import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CART_STATUS, CLOSE_CART } from "../types";

export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"), isActive: false }, action) => {
   switch (action.type) {
        case ADD_TO_CART:
        return { cartItems: action.payload.cartItems, cartIsActive: action.payload.cartIsActive};
        case REMOVE_FROM_CART:
        return { ...state, cartItems: action.payload.cartItems};
        case CHANGE_CART_STATUS:
        return { cartItems: action.payload.cartItems, cartIsActive: action.payload.cartIsActive};
        case CLOSE_CART:
          return { ...state, cartIsActive: action.payload.cartIsActive};
        default:
        return state;
   }
};