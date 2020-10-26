import { FETCH_PRODUCTS, FILTER_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, TOGGLE_MOBILE_MENU, TOGGLE_SORT_LIST, TOGGLE_LIST_ITEM } from "../types";
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

function toggleCheckbox(allFilters, property, term){
    
    if(term === 'clear' || property === 'price')
        {    if(property === 'all'){
                _.forEach(allFilters, function(value, key) {
                    _.forEach(value, function(value, key) {
                        console.log(value);
                        value['isActive'] = false;
                    }); 
                }); 
            }else{
                _.forEach(allFilters[property], function(value, key) {
                    console.log(allFilters[property]);
                    allFilters[property][key]['isActive'] = false;
                }); 
            }
   
    }
    if(term !== 'clear'){
        let currentKey = _.findKey(allFilters[property], function(o) { return o.id === term; });
        let isActive = allFilters[property][currentKey]['isActive'];    
        allFilters[property][currentKey]['isActive'] = (isActive) ? false : true;
    }
    
}

export const filterProducts = (products, property, term1, term2) => (dispatch, getState) => {

    let productFilter = getState().products.activeFilters; 
    let productFilters = getState().products.allFilters;
  
    toggleCheckbox(productFilters, property, term1)
    

    if(term1 === 'clear'){
        if(property === 'all'){
            console.log(term1);
            productFilter = [];
        }else{
            productFilter = _.omit(productFilter, [property]);
        }        
    }else{
        if(property === 'price'){
            productFilter[property] = [term1, term2];
        }else{
            (productFilter[property]) 
                ? ((productFilter[property].indexOf(term1) !== -1) 
                    ? _.pull(productFilter[property], term1)
                    : productFilter[property].push(term1) )
                : productFilter[property] = Array(term1);
        }
    }
    
    let filters = {};

    _.forEach(productFilter, function(value, key) {
        if(productFilter[key].length === 0 )delete productFilter.key;        
    });

    for (let prop in productFilter) {
        if(productFilter[prop].length === 0){
            _.pull(productFilter, productFilter[prop]);
            continue;
        }
        if(prop === "availableColor"){
            filters[prop] = val => !(_.isEmpty(_.intersection(val, productFilter[prop])));            
        }else if(prop === "price"){
            filters[prop] = val => _.inRange(val, productFilter[prop][0], productFilter[prop][1]);         
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


export const sortProducts = (filteredProducts, sort) => (dispatch, getState) => {
    console.log(8);
    if(getState().products.sortListOpen){
        sort = _.find(getState().products.sortOptions, function(o) { return o.selected; }).id;
    }
    const sortedProducts = filteredProducts.slice();
    if(sort === "new"){
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
            items: sortedProducts,
            sortListOpen: false
        }
    })
}

export const toggleMobileMenu = () => (dispatch, getState) => {    
    const mobileMenuIsActive = getState().products.mobileMenuIsActive ? false : true; 
    console.log(mobileMenuIsActive);
    dispatch({
        type: TOGGLE_MOBILE_MENU,
        payload: {mobileMenuIsActive: mobileMenuIsActive}
    });
}

export const toggleSortList = () => (dispatch, getState) => {   
    const sortListOpen = getState().products.sortListOpen ? false : true;
    dispatch({
        type: TOGGLE_SORT_LIST,
        payload: {sortListOpen: sortListOpen}
    });
}

export const toggleListItem = (item) => (dispatch, getState) => { 
    let sortOptions = getState().products.sortOptions.slice();
    let currentKey = _.findKey(sortOptions, function(o) { return o.id === item; });
    _.forEach(sortOptions, function(value, key) {
        _.set(value, 'selected', false);
    });
    sortOptions[currentKey].selected = true;
    console.log(currentKey);
    dispatch({
        type: TOGGLE_LIST_ITEM,
        payload: {sortOptions: sortOptions}
    });
}