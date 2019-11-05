import React from 'react';
import config from '../../../app-config';
import { connect } from 'react-redux';
import { getRestaurantOrders, updateOrderStatus, getMessages, sendMessage } from './../../redux/actions/order-actions';

class SellerHome extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            activeOrders: [],
            pastOrders: [],
        }
    }
    componentDidMount() {
        let id = JSON.parse(localStorage.getItem('user2'))._id;
        this.props.getRestaurantOrders({
            rest_id: id
        })
    }
    refresh(e) {
        e.stopPropagation();
        e.preventDefault();
        let id = JSON.parse(localStorage.getItem('user2'))._id;
        this.props.getRestaurantOrders({
            rest_id: id
        })
    }
    componentWillReceiveProps(next) {
        let activeOrders = next.rest_orders.filter(x=> x.status !== 'delivered' && x.status !== 'cancelled' )
        let pastOrders = next.rest_orders.filter(x=> x.status === 'delivered' || x.status === 'cancelled' )
        this.setState({
            activeOrders: activeOrders,
            pastOrders: pastOrders,
            messages: next.messages
        })
    }
    render() {
        let chatModal = (
        <div className="modal fade" id="chatModal" tabIndex="-1" role="dialog" aria-labelledby="chatModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="chatModalTitle">Chat</h5>
                    <span className="g-icon g-order-refresh fa fa-refresh" onClick={(e) => this.getMessages(this.state.selectedOrder)} style={{left: "80px",top: "20px"}}></span>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <form onSubmit={(e) => this.sendMessage(e)}>
                    <div id="chat-modal-body" className="modal-body" style={{maxHeight: "60vh", overflow: "auto"}}>
                        { this.props.messages.length > 0 ?  
                        this.props.messages.map(msg => {
                            return (
                                <div className={"g-" + msg.senderType + "-msg g-chat-msg"}>
                                   {msg.message} <span className="g-msg-timestamp">{this.getDate(msg.timestamp).date + "   " + this.getDate(msg.timestamp).time}</span>
                                   <span className="g-msg-sender">{msg.senderType === 'seller' ? 'You' : msg.senderName}</span>
                                </div>
                            )
                        }): (<div> No messages </div>)}
                    </div>
                    <div className="modal-footer">
                        <textarea className="form-control" style={{flex: '1'}} id="new-message" placeholder="Enter your message here"></textarea>
                        <button type="submit" className="btn btn-success">Send Message</button>
                    </div>
                </form>
                </div>
            </div>
        </div>);
        return ( 
            <div>
            {chatModal}
            <h3 style={{textAlign: "center"}}>
                YOUR ORDERS
            </h3>
            <div className="accordion" id="accordionOrders">
            <div className="card">
              <div className="card-header" id="active-orders" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Active Orders 
              </div>
              <span className="g-icon g-order-refresh fa fa-refresh" onClick={(e) => this.refresh(e)}></span>
              <div id="collapseOne" className="collapse show" aria-labelledby="active-orders" data-parent="#accordionOrders">
                 { this.state.activeOrders.length > 0 ? 
                       ( <div className="card-body">
                        <div className="accordion" id="accordionActiveOrders">
                        {
                            this.state.activeOrders.map((order,index) => {
                                return(
                                <div className="card" key={index}>
                                   <div className="card-header g-order-header" id={"active-order" + order._id} data-toggle="collapse" data-target={"#collapse"+ order._id} aria-expanded="true" aria-controls={"collapse"+ order._id }>
                                        <div style={{flex: '2'}}> <span className="g-secondary-text">Order ID </span> <b>{order._id}</b> </div> 
                                        <div style={{flex: '2'}}> <span className="g-secondary-text">From </span> <b>{order.cust_details.name}</b> </div> 
                                        <div> <span className="g-secondary-text"> On: </span> <b>{this.getDate(order.order_ts).date}</b> </div>
                                        <div> <span className="g-secondary-text">At: </span> <b>{this.getDate(order.order_ts).time}</b></div>
                                        <div><span className={"g-status "+ order.status}> {order.status.toUpperCase()}</span></div>
                                    </div>
                                    <div id={"collapse"+ order._id } className="collapse" aria-labelledby={"active-order" + order._id} data-parent="#accordionActiveOrders">
                                        <div className="card-body">
                                            <div className="g-update-order-status"> 
                                                <select className="form-control" id={'newstatus' + order._id}>
                                                    <option value="">--SELECT--</option>
                                                    <option disabled={order.status === 'ready' || order.status === 'preparing'} value="preparing">PREPARING</option>
                                                    <option disabled={order.status === 'ready'}value="ready">READY</option>
                                                    <option value="delivered">DELIVERED</option>
                                                    <option value="cancelled">CANCEL</option>
                                                </select>
                                                <button value={order._id} className="btn btn-primary" onClick={(e) => this.updateOrderStatus(e)}>Update Status</button>
                                            </div>
                                            {order.items.map( item => {
                                                return(
                                                <div className="g-menu-row">
                                                    <div className="g-menu-image">
                                                        <img className="g-image" src={config.base + item.image} alt="NO DISPLAY"/>
                                                    </div>
                                                    <div className="g-menu-desc">
                                                        <div className="g-menu-desc-title">{item.name}</div>
                                                        <div className="g-menu-desc-details">{item.description}</div>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Quantity<br/>
                                                        <b>{item.count}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Price<br/>
                                                        <b>${item.price}</b>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            <div className="g-menu-row"  style={{borderTop: "1px solid"}}>
                                                    <div className="g-menu-image">
                                                    <button className="btn btn-success" data-toggle="modal" data-target="#chatModal"
                                                         onClick={() => this.getMessages(order._id)}>Chat with Customer</button>
                                                    </div>
                                                    <div className="g-menu-desc">
                                                        Delivery address<br/>
                                                        <b>{order.cust_details.address}, {order.cust_details.zipcode}</b>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Contact <br/>
                                                        <b>{order.cust_details.phone}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Total<br/>
                                                        <b>${order.total}</b>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>
                       </div> ) : (
                            <div className="card-body g-secondary-text g-null-info"> You have no active orders </div>
                       )
                 }
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                     Past Orders
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionOrders">
              { this.state.pastOrders.length > 0 ? 
                       ( <div className="card-body">
                        <div className="accordion" id="accordionPastOrders">
                        {
                            this.state.pastOrders.map((order, index) => {
                                return(
                                <div className="card" key={index}>
                                    <div className="card-header g-order-header" id={"active-order" + order._id} data-toggle="collapse" data-target={"#collapse"+ order._id} aria-expanded="true" aria-controls={"collapse"+ order._id }>
                                        <div> <span className="g-secondary-text">Order ID </span> <b>{order._id}</b> </div> 
                                        <div style={{flex: '2'}}> <span className="g-secondary-text">From </span> <b>{order.cust_details.name}</b> </div> 
                                        <div> <span className="g-secondary-text"> On: </span> <b>{this.getDate(order.order_ts).date}</b> </div>
                                        <div> <span className="g-secondary-text">At: </span> <b>{this.getDate(order.order_ts).time}</b></div>
                                        <div><span className={"g-status "+ order.status}> {order.status.toUpperCase()}</span></div>
                                    </div>
                                    <div id={"collapse"+ order._id } className="collapse" aria-labelledby={"active-order" + order._id} data-parent="#accordionPastOrders">
                                        <div className="card-body">
                                            {order.items.map((item,index) => {
                                                return(
                                                <div className="g-menu-row" key={index}>
                                                    <div className="g-menu-image">
                                                        <img className="g-image" src={config.base + item.image} alt="NO DISPLAY"/>
                                                    </div>
                                                    <div className="g-menu-desc">
                                                        <div className="g-menu-desc-title">{item.name}</div>
                                                        <div className="g-menu-desc-details">{item.description}</div>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Quantity<br/>
                                                        <b>{item.count}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Price<br/>
                                                        <b>${item.price}</b>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            <div className="g-menu-row" style={{borderTop: "1px solid"}}>
                                                    <div className="g-menu-image"></div>
                                                    <div className="g-menu-desc">
                                                        Delivery address<br/>
                                                        <b>{order.cust_details.address}, {order.cust_details.zipcode}</b>
                                                    </div>
                                                    <div className="g-menu-quantity">
                                                        Contact <br/>
                                                        <b>{order.cust_details.phone}</b>
                                                    </div>
                                                    <div className="g-menu-price">
                                                        Total<br/>
                                                        <b>${order.total}</b>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>
                       </div> ) : (
                            <div className="card-body g-secondary-text g-null-info"> You have no past orders </div>
                       )
                 }
              </div>
            </div>
          </div>
          </div>
        )
    }
    updateOrderStatus(e) {
        let order_id = e.target.value;
        let status = document.getElementById('newstatus' + order_id).value;
        if(status !== "") {
            this.props.updateOrderStatus({
                status: status,
                order_id: order_id,
                rest_id: JSON.parse(localStorage.getItem('user2'))._id
            })
        }
    }
        getDate(dateString) {
        let date = new Date(dateString);
        return {
            date: ("0" + date.getDate()).slice(-2) + '-' + ("0" + date.getMonth()).slice(-2) + '-' + date.getFullYear(),
            time: ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2)
        }
    }
    getMessages(id) {
        this.setState({
            selectedOrder: id
        })
        this.props.getMessages({
            order_id: id
        })
        setTimeout(() => {
            let modalBody = document.getElementById("chat-modal-body");
            modalBody.scrollTop =  modalBody.scrollHeight - modalBody.clientHeight ;
        }, 1000)
    }
    sendMessage(e) {
        e.preventDefault();
        let req_body = {
            order_id : this.state.selectedOrder,
            message: {
                senderName: JSON.parse(localStorage.getItem('user2')).rest_name,
                senderType: "seller",
                message: document.getElementById("new-message").value.trim()
            }
        }
        document.getElementById("new-message").value = "";
        this.props.sendMessage(req_body);
    }
}
const mapStateToProps = state => {
    return {
        rest_orders: state.orderReducer.rest_orders,
        messages: state.orderReducer.messages
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        getRestaurantOrders: payload => dispatch(getRestaurantOrders(payload)),
        updateOrderStatus: payload => dispatch(updateOrderStatus(payload)),
         getMessages: payload => dispatch(getMessages(payload)),
         sendMessage: payload => dispatch(sendMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);