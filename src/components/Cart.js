import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from "react-reveal/Zoom";
import { removeFromCart, changeCartStatus, closeCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';
import onClickOutside from "react-onclickoutside";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleClickOutside = evt => {
        if(this.props.cartIsActive) this.props.closeCart();
      };
    createOrder = (event) => {
        event.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((acc, item) => (acc + item.price * item.count), 0),        
        }
        this.props.createOrder(order);
    }
    closeModal = () => {
        this.props.clearOrder();
    }
    render() {
        const { cartItems, order } = this.props;
        let isVisible = this.props.cartIsActive ? '' : 'none';
        console.log(isVisible);
        return ( 
           <div>
               {
               !this.props.cartIsActive  ? null :
                (
                <div>    
                <Fade top><div>
                    {cartItems.length === 0 
                    ? <div className="cart cart-header">Корзина пуста</div>
                    : <div className="cart cart-header">В корзине {cartItems.length} товар{" "}</div>}

                    {
                        order && <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="order-details">
                                    <h3 className="success-message">Ваш заказ принят.</h3>
                                    <h2>Заказ №{order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>Имя:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Адрес:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Дата:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Сумма:</div>
                                            <div> {formatCurrency(order.total)}</div>
                                        </li>
                                        <li>
                                            <div>Товары:</div>
                                            <div>{order.cartItems.map(x => (<div>{x.count} {" x "} {x.title}</div>))}</div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    }
                    
                    <div className="cart">
                    
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} X {item.count}{" "}
                                            <button className="button" onClick={()=>this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                        
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total: {" "}
                                {formatCurrency(cartItems.reduce((a,c) => a + (c.price*c.count), 0))}
                                </div>
                                <button onClick={()=>{this.setState({showCheckout: true})}} className="button primary">Proceed</button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <Fade right cascade>
                            <div className="cart">
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <button type="submit" className="button primary">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            </Fade>
                        )}
                        </div>
                        
                    )}

                </div> 
            </Fade>
            </div>)} 
        </div>
        )
        
    }
}
export default connect((state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems, 
    cartIsActive: state.cart.cartIsActive   
}), { removeFromCart, changeCartStatus, closeCart, createOrder, clearOrder })(onClickOutside(Cart));