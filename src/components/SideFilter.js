import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts } from '../actions/productActions';

class SideFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null,
        };
    }

    render() {
        return (
            
            <div className="side-filter">
                <div className="filter-item" data-id="price">
               <div className="filter-item-title">Цена</div>   
                    {this.props.allFilters.price.map(x => (                           
                        <label key={x.id} className="control control--radio">{x.name}
                        <input type="radio" name="radio" checked={x.isActive} data-min={x.min} data-max={x.max} onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.getAttribute("data-min"), e.target.getAttribute("data-max")))}/>
                        <div className="control__indicator"></div>
                        </label>                      
                        )
                    )}                    
                    <button className="button" onClick={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.getAttribute("data-id"), 'clear'))}>Сбросить</button>
               </div>
               <div className="filter-item" data-id="brand">
               <div className="filter-item-title">Производитель</div>
             
                        {this.props.allFilters.brand.map(x => (
                                <label key={x.id} className="control control--checkbox"><span>{x.id}</span>
                                <input type="checkbox" checked={x.isActive} value={x.id} onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                                <div className="control__indicator"></div>
                                </label>                           
                            )
                        )} 
                    
                    <button className="button" onClick={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.getAttribute("data-id"), 'clear'))}>Сбросить</button>
               </div>

               <div className="filter-item" data-id="availableColor">
               <div className="filter-item-title">Цвет</div>
               {this.props.allFilters.availableColor.map(x => (
                                <label key={x.id} className="control control--checkbox"><span>{x.name}</span>
                                <input type="checkbox" checked={x.isActive} value={x.id} onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                                <div className="control__indicator"></div>
                                </label>                           
                            )
                        )}                    
                    <button className="button" onClick={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.getAttribute("data-id"), 'clear'))}>Сбросить</button>
               </div>
               <div className="filter-item" data-id="special">
               <div className="filter-item-title">Особые характирисики</div>
               {this.props.allFilters.special.map(x => (
                                <label key={x.id} className="control control--checkbox"><span>{x.name}</span>
                                <input type="checkbox" checked={x.isActive} value={x.name} onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                                <div className="control__indicator"></div>
                                </label>                           
                            )
                        )}                    
                    <button className="button" onClick={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.getAttribute("data-id"), 'clear'))}>Сбросить</button>
               </div>
               <div className="clear-all-filters">
                   <button className="button" onClick={(e) => (this.props.filterProducts(this.props.products, "all", 'clear'))}>X Очистить все фильтры</button>
                </div>
               
            </div>
            )
    }
}


export default  connect((state) => ({      
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    activeFilters: state.products.activeFilters,
    allFilters: state.products.allFilters
}), {    
    filterProducts    
})(SideFilter);