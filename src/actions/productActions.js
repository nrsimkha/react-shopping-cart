import { FETCH_PRODUCTS, FILTER_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types";
import _ from 'lodash';

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    //console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
}

export const filterProducts = (products, property, term1, term2) => (dispatch, getState) => {    
    let productFilter = getState().products["filter"];

    (property === 'price') 
        ? productFilter[property] = [term1, term2]
        : (productFilter[property]) 
            ? ((productFilter[property].indexOf(term1) !== -1) 
                ? _.pull(productFilter[property], term1)
                : productFilter[property].push(term1) )
            : productFilter[property] = Array(term1);
    
    let filters = {};

    _.forEach(productFilter, function(value, key) {
        if(productFilter[key].length === 0){
            delete productFilter.key;
        }
    });

    for (let prop in productFilter) {
        if(productFilter[prop].length === 0){
            _.pull(productFilter, productFilter[prop]);
            continue;
        }
        if(prop === "availableColor"){
            filters[prop] = val => !(_.isEmpty(_.intersection(val, productFilter[prop])));            
        }else if(prop === "price"){
            filters[prop] = val => _.inRange(val, term1, term2);         
        }else{
            filters[prop] = val => productFilter[prop].indexOf(val) !== -1;           
        }

    }
    const filteredProducts = _.filter(products, _.conforms(filters));
    dispatch({
        type: FILTER_PRODUCTS,
        payload: {
            filter: productFilter,
            items: filteredProducts
        }
    })
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