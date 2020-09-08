import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sortProducts, toggleMobileMenu, toggleSortList, toggleListItem} from '../actions/productActions';
import SideFilter from './SideFilter';

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ?
            <div>Загрузка</div> : (
            <div>
                <div className="filter-mobile">
                    <div className="filter-mobile-buttons">
                        <button className="button filter-button" onClick={()=> this.props.toggleMobileMenu()}>Фильтры</button>
                        <button className="button sort-button" onClick={()=> this.props.toggleSortList()}>
                            <div className="sort_icon"></div>
                        </button>
    
                        
                    </div>
                   
                    {this.props.sortListOpen && <div className="sort-mobile"><ul className="dd-list">
                            {this.props.sortOptions.map((item) => (
                                <li className="dd-list-item" key={item.id} onClick={() => this.props.toggleListItem(item.id, item.key)} >{item.name}</li>
                                ))}
                        </ul>
                        <button className="button primary" onClick={(e) => this.props.sortProducts(this.props.filteredProducts)}>Применить</button></div>}
                   
                   {this.props.menuIsActive 
                   ? (<div style={{display: 'flex'}} className="filter-mobile_menu">
                        <SideFilter />
                        <button className="button primary" onClick={()=> this.props.toggleMobileMenu()}>Применить</button>
                    </div>
                     )
                    : null}
            </div>

            <div className="filter">                
                
                <div className="filter-result">{this.props.filteredProducts.length} Products</div>
                <div className="filter-sort">Сортировать {" "}
                <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                    <option value="new">По новизне</option>
                    <option value="lowest">По возрастанию цены</option>
                    <option value="highest">По убыванию цены</option>
                </select></div>
                
            </div></div>)
        )
    }
}

export default  connect((state) => ({    
    sort: state.products.sort,   
    filteredProducts: state.products.filteredItems,
    menuIsActive: state.products.mobileMenuIsActive,
    sortListOpen: state.products.sortListOpen,
    sortOptions: state.products.sortOptions
}), {
    sortProducts, toggleMobileMenu, toggleSortList, toggleListItem
})(Filter);