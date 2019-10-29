import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './../redux/actions/login-action';
import logo from '../../assets/images/logo.png';

class Login extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            option: "1",
            gotoSignupBuyer: false,
            gotoSignupSeller: false,
            rememberUser: false
        }
    }
    componentDidMount() {
        if(localStorage.getItem('user1')) {
           let user = JSON.parse(localStorage.getItem('user1'));
           this.props.login({ email: user.email, password: user.password, option: '1'  });
        } else if(localStorage.getItem('user2')) {
            let user = JSON.parse(localStorage.getItem('user2'));
            this.props.login({ email: user.email, password: user.password, option: '2'  });
        } else {
            let lsUser = localStorage.getItem('latestUser');
            if(lsUser) {
                lsUser = JSON.parse(lsUser);
                this.setState({
                    email: lsUser.email,
                    password: lsUser.password,
                    option: lsUser.option
                })
            }
        }
    }
    render() {
        if(this.props.loginBuyer) {
            return <Redirect to='/buyer/home' />
        }
        if(this.props.loginSeller) {
            return <Redirect to='/seller/home' />
        }
        if(this.state.gotoSignupBuyer) {
            return <Redirect to='/signup-buyer' />
        }
        if(this.state.gotoSignupSeller) {
            return <Redirect to='/signup-seller' />
        }
        return(
        <div style={{display: "flex"}}>
        <img src={logo} alt="logo" style={{width: "400px", height: "272px"}}/>
        <form onSubmit={(e) => this.submitLogin(e)} style={{ paddingLeft: "100px"}}>
            <div className='g-input-field'>
                <div className='g-input-label'>I am a </div> 
                <div className='g-input-control'>
                    <select className="form-control" onChange = {(e) => this.setState({option : e.target.value})} value={this.state.option}>
                        <option value="1">Customer</option>
                        <option value="2">Restaurant</option>
                    </select>
                </div>
            </div>
            
            <div className='g-input-field'>
                <div className='g-input-label'>Email:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({email : e.target.value})} type="email" className="form-control"  
                     name="username" placeholder="Enter email" required value={this.state.email}/>
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Password:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({password : e.target.value})} type="password" className="form-control" name="password" 
                     placeholder="Enter password" required value={this.state.password}/>
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'></div> 
                <div className='g-input-control'>
                    <input className="form-check-input" type="checkbox" checked={this.state.rememberUser} onChange={(e) => this.setState({rememberUser: e.target.checked})}/>
                        Remember me
                </div>
            </div>
            <div className='g-action-panel'>
                 <button type="button" className="btn btn-outline-primary" onClick={() => this.setState({gotoSignupBuyer: true})}>
                     Sign Up</button>
                 <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <div className='g-action-panel'>
                 <button type="button" className="btn btn-link" onClick={() => this.setState({gotoSignupSeller: true})}>
                     Want to Register as a restaurant?</button>
            </div>
        </form> 
        </div>
        )
    }
    submitLogin(e) {
        e.preventDefault();
        if(this.state.rememberUser) {
            localStorage.setItem('latestUser', JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                option: this.state.option
            }))
        }
        this.props.login({ email: this.state.email, password: this.state.password, option: this.state.option  });
    }
}
const mapStateToProps = state => {
    return {
        loginBuyer: state.loginReducer.isAuthenticatedBuyer,
        loginSeller: state.loginReducer.isAuthenticatedSeller
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      login: payload => dispatch(login(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);