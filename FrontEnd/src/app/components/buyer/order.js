import React from 'react';
import { connect } from 'react-redux';
import config from './../../../app-config';
import { setCartCount } from './../../redux/actions/order-actions';
import { setMessage } from './../../redux/actions/util-action';

class BuyerOrder extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            display_items: null,
            total: 0
        }
    }
    componentWillMount() {
        let obj = {};
        let itemsArr = this.props.selectedOrderRest.items;
        let sections = this.props.selectedOrderRest.sections;
        itemsArr.forEach(item => {
            item['count'] = 0 ;
        })
        sections.forEach( section => {
                obj[section.section_name] = itemsArr.filter(item => item.section === section._id);
        })
        this.setState({
            display_items: Object.assign({}, obj),
        })
    }
    render() {
        
        let array = [];
        if(this.state.display_items) {
            array.push(
                <div className='g-order-rest-title'>
                   <img src={config.base  + this.props.selectedOrderRest.image} alt="NO DISPLAY"/>
                   <div>
                       <span style={{fontSize: '38px'}}> {this.props.selectedOrderRest.rest_name} </span>  
                       <span className='g-secondary-text'> Address </span>
                       <span style={{fontSize: '17px'}}> {this.props.selectedOrderRest.address}, <br/> {this.props.selectedOrderRest.zipcode} </span>
                       <span className='g-secondary-text'> Contact </span>
                       <span style={{fontSize: '17px'}}> {this.props.selectedOrderRest.phone} </span>
                   </div>
                </div>
            )
            Object.keys(this.state.display_items).forEach( key => {
                if(this.state.display_items[key].length > 0) {
                    array.push(
                    <div className="g-section-head">
                         {key.toUpperCase()}
                    </div>
                    )
                    this.state.display_items[key].forEach( item => {
                        array.push(
                            <div className="g-menu-row">
                                <div className="g-menu-image">
                                     <img className="g-image" src={config.base + item.image} alt="NO DISPLAY"/>
                                </div>
                                <div className="g-menu-desc">
                                    <div className="g-menu-desc-title">{item.name}</div>
                                    <div className="g-menu-desc-details">{item.description}</div>
                                </div>
                                <div className="g-menu-price">
                                     Price<br/>
                                     <b>${item.price}</b>
                                </div>
                                <div className="g-menu-quantity">
                                     <span> Quantity</span>
                                     <div className="g-qty">
                                        <span className="minus" id={key + ':' + item._id} onClick={(e) => this.decCount(e.target.id)}>-</span>
                                        <span className="count">{item.count}</span>
                                        <span className="plus" id={key + ':' + item._id} onClick={(e) => this.incCount(e.target.id)}>+</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
            });
            if(this.state.total > 0) {
                array.push(
                    <div className="g-section-head" style={{justifyContent: "flex-end" , paddingRight: "68px"}}>
                        <button className="btn btn-success"  style={{marginRight: "24px"}} 
                        onClick={() => this.addToCart()}> ADD TO CART</button>
                        <span style={{width: "120px"}}>TOTAL: ${this.state.total}</span>
                    </div> 
                )
            } else {
                array.push(
                    <div className="g-section-head" style={{justifyContent: "flex-end", paddingRight: "68px"}}>
                        <span style={{width: "120px"}}>TOTAL: ${this.state.total}</span>
                    </div> 
                )
            }
        }
        return array;
    }
    addToCart() {
        let confirm = true;
        if( JSON.parse(localStorage.getItem('cart')) !== null) {
            confirm = window.confirm('You have items in your cart from a different order. Are you sure you want to replace them with this one?');
        }
        if(confirm) {
            let itemsAdded = {
                rest_id: this.props.selectedOrderRest._id,
                total: this.state.total,
                items: [],
                cust_id: JSON.parse(localStorage.getItem('user1'))._id
            };
            Object.keys(this.state.display_items).forEach(key => { 
                if(this.state.display_items[key].length > 0) {
                    this.state.display_items[key].forEach(item => { 
                        if(item.count > 0) {
                            itemsAdded.items.push(item)
                        }
                    })
                } 
            })
            try {
                localStorage.setItem('cart', JSON.stringify(itemsAdded));
                this.props.setCartCount();
                this.props.setMessage({
                    msg: 'Successfully added items to your cart',
                    name: 'success'
                })
            } catch {
                this.props.setMessage({
                    msg: 'Could not add items to your cart',
                    name: 'danger'
                })
            }
        }
    }
    decCount(val) {
        let sec,id;
        [sec,id] = val.split(':'); 
        let disp = Object.assign({}, this.state.display_items);
        let total = this.state.total;
        Object.keys(disp).forEach(key => {
            if(key === sec) {
                disp[key] = disp[key].map(item => {
                    if(item._id === id && item.count > 0) {
                        item.count --;
                        total-= parseFloat(item.price);
                    }
                    return item;
               });
            }
        })
        this.setState({
            display_items: Object.assign({}, disp),
            total: total
        })
    }
    incCount(val) {
        let sec,id;
        [sec,id] = val.split(':'); 
        let disp = Object.assign({}, this.state.display_items);
        let total = this.state.total;
        Object.keys(disp).forEach(key => {
            if(key === sec) {
                disp[key] = disp[key].map(item => {
                    if(item._id === id) {
                        item.count ++;
                        total+= parseFloat(item.price);
                    }
                    return item;
               });
            }
        })
        this.setState({
            display_items: Object.assign({}, disp),
            total: total
        })
    }
}
const mapStateToProps = state => {
    return {
        selectedOrderRest: state.menuReducer.selectedOrderRest,
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        setCartCount: () => dispatch(setCartCount()),
        setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder);