import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProductsByBrand } from '../actions/productActions';

class SideFilter extends Component {
    componentDidUpdate(props) {
        if (this.props.someImportantItem && !props.someImportantItem || this.props.someImportantItem !== props.someImportantItem) {
          // code here to make a request
        }
      }
    render() {
        return (
            <div className="side-filter">
                <div className="filter-item">
               <div className="filter-item-title">Цена</div>               
                    <label class="control control--radio">Меньше 3 000
                    <input type="radio" name="radio" value="under_3" />
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--radio">3 000 - 5 000
                    <input type="radio" name="radio"/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--radio">Больше 5 000
                    <input type="radio" name="radio"/>
                    <div class="control__indicator"></div>
                    </label>
               </div>
               <div className="filter-item">
               <div className="filter-item-title">Производитель</div>
               <label class="control control--checkbox"><span>Casio</span>
                    <input type="checkbox" value="Casio" onChange={(e) => this.props.filterProductsByBrand(this.props.products, e.target.value)}/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Romanson
                    <input type="checkbox" value="Romanson" onChange={(e) => this.props.filterProductsByBrand(this.props.products, e.target.value)}/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Orient
                    <input type="checkbox Orient" onChange={(e) => this.props.filterProductsByBrand(this.props.products, e.target.value)}/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Другие
                    <input type="checkbox" onChange={(e) => this.props.filterProductsByBrand(this.props.products, e.target.value)}/>
                    <div class="control__indicator"></div>
                    </label>
               </div>
               <div className="filter-item">
               <div className="filter-item-title">Особые характирисики</div>
               <label class="control control--checkbox"><span>Водонепроницаемые</span>
                    <input type="checkbox" />
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Секундомер
                    <input type="checkbox"/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Будильник
                    <input type="checkbox"/>
                    <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">Другие
                    <input type="checkbox"/>
                    <div class="control__indicator"></div>
                    </label>
               </div>
            </div>
        )
    }
}


export default  connect((state) => ({
    brand: state.products.brand,    
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
}), {
    filterProductsByBrand    
})(SideFilter);