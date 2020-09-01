const { FETCH_PRODUCTS, FILTER_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_BRAND } = require("../types");

export const productReducer = (state = {}, action) => {
    switch (action.type){
        case FETCH_PRODUCTS:
            return { items: action.payload, filteredItems: action.payload, filter: {}}
        case FILTER_PRODUCTS:
            /*console.log(action.payload);
            console.log({ 
                ...state,
                ...action.payload
            });*/
            return { 
                 ...state,
                filter: action.payload.filter,
                filteredItems: action.payload.items
                
            }
        case FILTER_PRODUCTS_BY_BRAND:
                return { ...state,
                    brand: action.payload.brand,
                    filteredItems: action.payload.items
                };                
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