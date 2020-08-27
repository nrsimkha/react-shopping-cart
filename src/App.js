//feature 1
import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';
import Header from './components/Header';
import SideFilter from './components/SideFilter';

class App extends React.Component {
  render () {
      return (
      <Provider store={store}>
        <div className="grid-container">
            <Header />
            <main>
              <div className="content">
                <div className="main">
                  <Filter/>
                  <div className="flexbx">
                    <SideFilter />
                    <Products />
                  </div>
                </div>
                <div className="sidebar">
                  <Cart />
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
