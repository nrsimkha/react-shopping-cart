import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-sort">Order {" "}
                <select value={this.props.sort} onChange={this.props.sortProducts}>
                    <option>Lateset</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select></div>
                <div className="filter-color">Filter {" "}
                <select value={this.props.color} onChange={this.props.filterProducts}>
                    <option value="">All</option>
                    <option value="black">black</option>
                    <option value="blue">blue</option>
                    <option value="brown">brown</option>
                    <option value="white">white</option>
                </select></div>
                
            </div>
        )
    }
}
