import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_COLOR, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
}
export const filterProducts = (products, color) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_COLOR,
        payload: {
            color: color,
            items: color === "" ? products : products.filter(product => product.availableColor.indexOf(color) !== -1)
        },
    });
}
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if(sort === ""){
        sortedProducts.sort((a,b) => a._id > b._id ? 1 : -1)
    }else{
        sortedProducts.sort((a,b) => (
            sort === "lowest" ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1)
        ))
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}