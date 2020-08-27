const { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_COLOR, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_BRAND } = require("../types");

export const productReducer = (state = {}, action) => {
    switch (action.type){
        case FETCH_PRODUCTS:
            return { items: action.payload, filteredItems: action.payload}
        case FILTER_PRODUCTS_BY_COLOR:
            return { 
                ...state,
                color: action.payload.color,
                filteredItems: action.payload.items
            }
        case FILTER_PRODUCTS_BY_BRAND:
                let newState = { ...state,
                    brand: action.payload.brand,
                    filteredItems: action.payload.items
                };
                console.log(newState);
                console.log(state);
                return {...state, ...newState};
        case ORDER_PRODUCTS_BY_PRICE:
            return { 
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items
            }
        default:
            return state;
    }
};