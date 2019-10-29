import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import SellerHome from './home';
import SellerNav from './seller-nav';
import SellerProfile from './profile';
import Menu from './menu';
import { setAuthSeller } from '../../redux/actions/login-action';
import { connect } from 'react-redux';
import axios from 'axios';
class SellerMain extends React.Component { 
    render() {
        axios.defaults.headers.common['Authorization'] = "Bearer " +  localStorage.getItem('token'); 
        if(!localStorage.getItem('user2')) {
            return <Redirect to="/"/>
        } else {
            this.props.setAuthSeller();
        }
        return ( 
            <div className='g-seller-main'>
                <div className='g-seller-nav g-box-shadow2'>
                    <SellerNav/>
                </div>
               <div className='g-seller-content'>
                    <Switch>
                        <Route exact path="/seller/home" component={SellerHome}/>
                        <Route exact path="/seller/profile" component={SellerProfile}/>
                        <Route exact path="/seller/menu" component={Menu}/>
                    </Switch>
               </div>
            </div>
        )
    }
    showMenu() {
        this.setState({
            showMenu: true
        })
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setAuthSeller: () => dispatch(setAuthSeller())
    };
}
export default connect(null, mapDispatchToProps)(SellerMain);