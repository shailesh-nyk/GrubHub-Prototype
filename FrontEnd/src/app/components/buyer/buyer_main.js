import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import BuyerNav from './buyer-nav';
import BuyerHome from './home';
import BuyerProfile from './profile';
import BuyerOrder from './order';
import BuyerOrderHistory from './order-history';
import { connect } from 'react-redux';
import { setAuthBuyer } from './../../redux/actions/login-action';
import axios from 'axios'
class BuyerMain extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        axios.defaults.headers.common['Authorization'] = "Bearer " +  localStorage.getItem('token'); 
        if(!localStorage.getItem('user1')) {
            return <Redirect to="/"/>
        } else {
            this.props.setAuthBuyer();
        }
        return ( 
            <div className='g-buyer-main'>
                <div className='g-buyer-nav g-box-shadow2'>
                    <BuyerNav/>
                </div>
               <div className='g-buyer-content'>
                    <Switch>
                            <Route exact path="/buyer/" render={() => (
                                <Redirect to="/buyer/home" />
                            )} />
                            <Route path="/buyer/home" component={BuyerHome}/>
                            <Route path="/buyer/profile" component={BuyerProfile}/>
                            <Route path="/buyer/order" component={BuyerOrder}/>
                            <Route path="/buyer/orderhistory" component={BuyerOrderHistory}/>
                    </Switch>
               </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setAuthBuyer: () => dispatch(setAuthBuyer())
    };
}
export default connect(null, mapDispatchToProps)(BuyerMain);