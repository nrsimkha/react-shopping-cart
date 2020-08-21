//feature 1
import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: data.products,
      color: "",
      sort: ""
    }
  }
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(sort);
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a,b) => (
          sort === "lowest"  
            ? a.price > b.price 
              ? 1 
              : -1 
            : sort === "highest" 
              ? a.price < b.price 
                ? 1 
                : -1 
              : (a._id > b._id) ? 1 : -1
      )
    )})

  }
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({
        color: event.target.value,
        products: data.products
      })
    }else{
      this.setState({
        color: event.target.value,
        products: data.products.filter(product => product.availableColor.find(color => color === event.target.value))
      })
    }

  }
  render () {
      return (
      <div className="grid-container">
          <header>
            <a href="/">React Shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter count={this.state.products.length} color={this.state.color} sort={this.state.sort} filterProducts={this.filterProducts} sortProducts={this.sortProducts}/>
                <Products products={this.state.products}/>
              </div>
              <div className="sidebar">Cart Items</div>
            </div>
          </main>
          <footer>All right is reserved</footer>
      </div>
    );
  }

}

export default App;
