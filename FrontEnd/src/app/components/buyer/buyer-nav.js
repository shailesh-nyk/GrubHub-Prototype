import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo2 from '../../../assets/images/logo2.png';
import logo3 from '../../../assets/images/logo3.png';
import { connect } from 'react-redux';
import { placeOrder } from '../../redux/actions/order-actions';
import { logOutBuyer } from './../../redux/actions/login-action';

class BuyerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user1')),
            logOut: false,
            cart: [],
            cart_total: 0,
            order_successful: false
        }
    }
    componentDidMount() {
        this.setCart();
    }   
    componentWillReceiveProps(next) {
        if(next.order_successful) {
            localStorage.setItem('cart', null);
            this.setCart();
            this.setState({
                order_successful: true
            })
        } else {
            this.setCart();
        }
    }
    render() {
        if(!localStorage.getItem('user1')) {
            return <Redirect to='/'/>
        }
        if(this.state.order_successful) {
            document.getElementById('hidden-link').click();
        }
        let cart_rows;
        let footer = null;
        if(this.state.cart.length > 0) {
            cart_rows = (
                <div>
                    <div className='g-cart-row'>
                        <div style={{ flex: "2" }}>Item name</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div></div>
                    </div>
                { 
                    this.state.cart.map((item,index) => {
                        return (
                                <div key={index} className='g-cart-row'>
                                    <div style={{ flex: "2" }}>{item.name}</div>
                                    <div className="g-qty">
                                        <span className="minus" id={index} onClick={(e) => this.decCount(e.target.id)}>-</span>
                                        <span className="count">{item.count}</span>
                                        <span className="plus" id={index} onClick={(e) => this.incCount(e.target.id)}>+</span>
                                    </div>
                                    <div>${item.count * item.price}</div>
                                    <div id={item._id} className="fa fa-trash-o g-icon" onClick={(e) => this.deleteItem(e.target.id)}></div>
                                </div>
                        )
                    }) 
                }
                <div className='g-cart-row' style={{marginTop:"38px"}}>
                        <div style={{ flex: "2" }}></div>
                        <div></div>
                        <div></div>
                        <div>Total: ${this.state.cart_total}</div>
                </div>
            </div>
            )
            footer = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success" onClick={()=> this.placeOrder()}>Place Order</button>
                </div>
            )
        } else {
            cart_rows = (<div className="g-secondary-text" style={{textAlign: "center", fontStyle: "italic"}}>You have no items in your cart</div>);
        }
        return ( 
            <div className='g-seller-navbar'>
                <Link to="/buyer/home" className='g-nav-logo'>
                    <img src={logo3} alt="logo"/>
                    <img src={logo2} alt="logo"/>
                </Link>
                <Link to="/buyer/orderhistory/" id='hidden-link'></Link>
                <span style={{flex : '1'}}></span>
                <Link to="/buyer/home" className="btn btn-outline-primary g-menu-button">SEARCH</Link>
                <span style={{flex : '1'}}></span>
                <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         <Link to="/buyer/profile" className="dropdown-item">My Profile</Link>
                         <Link to="/buyer/orderhistory" className="dropdown-item">My Orders</Link>
                         <button className="dropdown-item" onClick={() => this.logOut()}>Logout</button>
                     </div>
                 </div>
                 <div className="fa fa-shopping-cart g-cart-nav" data-toggle="modal" data-target="#cartModal" onClick={() => this.setCart()}>
                     <span>{this.state.cart.length}</span>
                 </div>

                 {/* CART MODAL  */}
                <div style={{color: "black"}} className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="cartModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cartModalTitle">Your order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {cart_rows}
                            </div>
                           {footer}
                        </div>
                    </div>
                </div>
            </div>
         )
    }
    setCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart && this.state.user._id === cart.cust_id) {
            this.setState({
                cart: cart.items,
                cart_total: cart.total
            })
        }
    }
    deleteItem(id) {
        let cart =  JSON.parse(localStorage.getItem('cart'));
        let selectedItem = cart.items.find(item => item._id === id);
        cart.total -= selectedItem.count * selectedItem.price;
        cart.items = cart.items.filter(item => item._id !== id);
        if(cart.items.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
            this.setState({
                cart: [],
                cart_total: 0
            })
        }
        this.setCart();
    }
    incCount(index) {
        let cart =  JSON.parse(localStorage.getItem('cart'));
        cart.items[index].count++;
        cart.total += cart.items[index].price;
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setCart();
    }
    decCount(index) {
        let cart =  JSON.parse(localStorage.getItem('cart'));
        if(cart.items[index].count > 1) {
            cart.items[index].count--;
            cart.total -= cart.items[index].price;
            localStorage.setItem('cart', JSON.stringify(cart));
            this.setCart();
        }
    }
    logOut() {
        this.props.logOutBuyer();
    }
    placeOrder() {
        window.$('.modal').modal('hide');
        this.props.placeOrder({
            cust_id: this.state.user._id,
            items: this.state.cart,
            rest_id: JSON.parse(localStorage.getItem('cart')).rest_id,
            total: this.state.cart_total
        })
    }
}
const mapStateToProps = state => {
    return {
        cart_change_trigger: state.orderReducer.cart_change,
        order_successful: state.orderReducer.order_successful,
        isAuthenticatedBuyer: state.loginReducer.isAuthenticatedBuyer
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      placeOrder: payload => dispatch(placeOrder(payload)),
      logOutBuyer: () => dispatch(logOutBuyer())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerNav);
