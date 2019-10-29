import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo2 from '../../../assets/images/logo2.png';
import logo3 from '../../../assets/images/logo3.png';
import { connect } from 'react-redux';
import { logOutSeller } from './../../redux/actions/login-action';

class SellerNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user2')),
        }
    }
    render() {
        if(!localStorage.getItem('user2')) {
            return <Redirect to="/"/>
        }
        return ( 
           <div className='g-seller-navbar'>
                <Link to="/seller/home" className='g-nav-logo'>
                    <img src={logo3} alt="logo"/>
                    <img src={logo2} alt="logo"/>
                </Link>
               <span style={{flex : '1'}}></span>
               <Link to="/seller/home" className="btn btn-outline-primary g-menu-button">ORDERS</Link>
               <span style={{flex : '1'}}></span>
               <div className="dropdown" style={{marginRight: '32px'}}>
                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                         Hi , {this.state.user.name}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         <Link to="/seller/profile" className="dropdown-item">My Profile</Link>
                         <Link to="/seller/menu" className="dropdown-item">My Menu</Link>
                         <button className="dropdown-item" onClick={() => this.logOut()}>Logout</button>
                     </div>
                </div>
           </div>
        )
    }
    logOut() {
        this.props.logOutSeller();
    }
}
const mapDispatchToProps = dispatch => {
    return {
      logOutSeller: () => dispatch(logOutSeller()),
    };
}
const mapStateToProps = state => {
    return {
        isAuthenticatedSeller: state.loginReducer.isAuthenticatedSeller
    }   
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerNav);