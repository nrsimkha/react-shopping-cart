import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeCartStatus } from '../actions/cartActions';

class Header extends Component {
    render() {
        const { cartItems } = this.props;
        return (            
            <header>
              <a href="/">React Shopping cart</a>
              <div className="cart-link" onClick={()=> this.props.changeCartStatus()}>
                <div className="cart-link_icon">
                    {!cartItems.length ? "" : (<div className="cart-link_count">{cartItems.length}</div>)}
                </div>
                  <div className="cart-link_label">Корзина</div>
              </div>
            </header>
           
        )
    }
}
export default connect((state) => ({ 
    cartItems: state.cart.cartItems, 
    cartIsActive: state.cart.cartIsActive   }), {changeCartStatus})(Header);

