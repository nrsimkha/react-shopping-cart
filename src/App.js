//feature 1
import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
        
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  removeFromCart =(product) => {
    const cartItems = this.state.cartItems.slice();  
    this.setState({cartItems: cartItems.filter(item => item._id !== product._id)});
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  };

  render () {
      return (
      <Provider store={store}>
        <div className="grid-container">
            <header>
              <a href="/">React Shopping cart</a>
            </header>
            <main>
              <div className="content">
                <div className="main">
                  <Filter/>
                  <Products addToCart={this.addToCart} />
                </div>
                <div className="sidebar">
                  <Cart createOrder={this.createOrder} removeFromCart={this.removeFromCart} cartItems={this.state.cartItems}/>
                </div>
              </div>
            </main>
            <footer>All right is reserved</footer>
        </div>
      </Provider>
    );
  }

}

export default App;
