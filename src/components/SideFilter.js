import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts } from '../actions/productActions';

class SideFilter extends Component {

    render() {
        return (
            <div className="side-filter">
                <div className="filter-item" data-id="price">
               <div className="filter-item-title">Цена</div>               
                    <label className="control control--radio">Меньше 3 000
                    <input type="radio" name="radio" data-min="0" data-max="3001" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.getAttribute("data-min"), e.target.getAttribute("data-max")))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--radio">3 000 - 5 000
                    <input type="radio" name="radio" data-min="3001" data-max="5001" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.getAttribute("data-min"), e.target.getAttribute("data-max")))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--radio">Больше 5 000
                    <input type="radio" name="radio" data-min="5001" data-max="1000000" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.getAttribute("data-min"), e.target.getAttribute("data-max")))}/>
                    <div className="control__indicator"></div>
                    </label>
               </div>
               <div className="filter-item" data-id="brand">
               <div className="filter-item-title">Производитель</div>
               <label className="control control--checkbox"><span>Casio</span>
                    <input type="checkbox" value="Casio" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Romanson
                    <input type="checkbox" value="Romanson" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value,))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Orient
                    <input type="checkbox" value="Orient" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value,))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Другие
                    <input type="checkbox" onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}/>
                    <div className="control__indicator"></div>
                    </label>
               </div>
               <div className="filter-item" data-id="availableColor">
               <div className="filter-item-title">Цвет</div>
               <label className="control control--checkbox"><span>Черный</span>
                    <input type="checkbox" value="black" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value ))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Коричневый
                    <input type="checkbox" value="brown" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value ))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Белый
                    <input type="checkbox" value="white" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Синий
                    <input type="checkbox" value="blue" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.value, e.target.parentNode.parentNode.getAttribute("data-id")))}/>
                    <div className="control__indicator"></div>
                    </label>
               </div>
               <div className="filter-item" data-id="special">
               <div className="filter-item-title">Особые характирисики</div>
               <label className="control control--checkbox"><span>Водонепроницаемые</span>
                    <input type="checkbox" value="Водонепроницаемые"  onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Секундомер
                    <input type="checkbox" value="Секундомер" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Будильник
                    <input type="checkbox" value="Будильник" onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
                    <label className="control control--checkbox">Другие
                    <input type="checkbox" value="Другие"  onChange={(e) => (this.props.filterProducts(this.props.products, e.target.parentNode.parentNode.getAttribute("data-id"), e.target.value))}/>
                    <div className="control__indicator"></div>
                    </label>
               </div>
            </div>
        )
    }
}


export default  connect((state) => ({      
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    filter: state.products.filter,
}), {    
    filterProducts    
})(SideFilter);