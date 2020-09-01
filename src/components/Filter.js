import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sortProducts} from '../actions/productActions';

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ?
            <div>Загрузка</div> : (
            <div className="filter">
                <div className="filter-result">{this.props.filteredProducts.length} Products</div>
                <div className="filter-sort">Сортировать {" "}
                <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                    <option>По новизне</option>
                    <option value="lowest">По возрастанию цены</option>
                    <option value="highest">По убыванию цены</option>
                </select></div>
                
            </div>)
        )
    }
}

export default  connect((state) => ({    
    sort: state.products.sort,   
    filteredProducts: state.products.filteredItems,
}), {
    sortProducts
})(Filter);