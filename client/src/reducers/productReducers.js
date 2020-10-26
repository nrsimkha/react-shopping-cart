const { FETCH_PRODUCTS, FILTER_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_BRAND, TOGGLE_MOBILE_MENU, TOGGLE_SORT_LIST, TOGGLE_LIST_ITEM } = require("../types");

const productFilters = {
    brand: [
        { id: 'Casio', isActive: false }, 
        { id: "Romanson", isActive: false }, 
        { id: "Orient", isActive: false }, 
        { id: "Восток", isActive: false }
    ],
    availableColor: [
        { id: 'black', name: 'Черный', isActive: false }, 
        {id: 'white', name: 'Белый', isActive: false}, 
        {id: 'blue', name: 'Синий', isActive: false}, 
        {id: 'brown', name: 'Коричневый', isActive: false}
    ],
    special: [
        {id: 'Будильник', name:'Будильник', isActive: false}, 
        {id: 'Водонепроницаемые', name:'Водонепроницаемые', isActive: false}, 
        {id: 'Секундомер', name:'Секундомер', isActive: false}
    ],
    price: [
        {id: '0', name:'Меньше 3 000', min:'0', max:'3001', isActive: false}, 
        {id: '3001', name:'3 000 - 5 000', min:'3001', max:'5001', isActive: false}, 
        {id: '5001', name:'Больше 5 000', min:'5001', max:'1000000', isActive: false}
    ]
}
const sortOptions = [
    {id: 'new', name:'По новизне', selected: false},{id: 'lowest', name:'По возрастанию цены', selected: false},{id: 'highest', name:'По убыванию цены', selected: false}]

export const productReducer = (
    state = {allFilters: productFilters, sortOptions: sortOptions, sortListOpen: false}, action) => {
    switch (action.type){
        case FETCH_PRODUCTS:
            return { ...state, items: action.payload, filteredItems: action.payload, activeFilters: {}}
        case FILTER_PRODUCTS:
            return { 
                 ...state,
                 activeFilters: action.payload.filter,
                filteredItems: action.payload.items
                
            }
        case FILTER_PRODUCTS_BY_BRAND:
                return { ...state,
                    brand: action.payload.brand,
                    filteredItems: action.payload.items,
                };                
        case ORDER_PRODUCTS_BY_PRICE:
            return { 
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
                sortListOpen: action.payload.sortListOpen
            }
        case TOGGLE_MOBILE_MENU:
            return {
                ...state,
                mobileMenuIsActive: action.payload.mobileMenuIsActive
            }
        case TOGGLE_SORT_LIST:
            return {
                ...state,
                sortListOpen: action.payload.sortListOpen
            }
        case TOGGLE_LIST_ITEM:
            return {
                ...state,
                sortOptions: action.payload.sortOptions                
            }
        default:
            return state;
    }
};