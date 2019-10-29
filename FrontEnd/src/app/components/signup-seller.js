import React from 'react';
import { connect } from 'react-redux';
import { signupSeller } from './../redux/actions/signup-action';
import { Redirect } from 'react-router-dom';
import { setMessage } from './../redux/actions/util-action';

class SignUpSeller extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: '',
            rest_name: '',
            cuisine: '',
            rest_address: '',
            rest_zipcode: '',
            gotoLogin: false
        }
    }
    render() {
        if(this.state.gotoLogin) {
            return <Redirect to='/login' />
        }
        return(
        <div style={{margin: '48px auto', width: '60%'}}>
        <h2 style={{textAlign: 'center'}}>NEW SELLER REGISTRATION</h2>
        <form onSubmit={(e) => this.registerSeller(e)}>
             <div className='g-input-field'>
                <div className='g-input-label'>Full Name:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({name : e.target.value})} type="text" className="form-control"  
                     name="name" placeholder="Enter full name" required />
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Email:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({email : e.target.value})} type="email" className="form-control"  
                     name="email" placeholder="Enter email" required />
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Phone Number:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({phone : e.target.value})} type="tel" className="form-control"  
                     name="phone" placeholder="Enter phone number" required pattern="^\d{10}$"/>
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Password:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({password : e.target.value})} type="password" className="form-control" name="password" 
                     placeholder="Enter password" required minLength="8"/>
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Confirm Password:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({confirmpassword : e.target.value})} type="password" className="form-control" name="confirmpassword" 
                     placeholder="Re-enter password" required minLength="8"/>
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Restaurant Name:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({rest_name : e.target.value})} type="text" className="form-control"  
                     name="rest_name" placeholder="Enter restaurant's name" required />
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Cuisine:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({cuisine : e.target.value})} type="text" className="form-control"  
                     name="cuisine" placeholder="Enter your restaurant's cuisine" required />
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Restaurant Address:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({rest_address : e.target.value})} type="text" className="form-control"  
                     name="rest_address" placeholder="Enter restaurant's adrress" required />
                </div>
            </div>
            <div className='g-input-field'>
                <div className='g-input-label'>Restaurant Zipcode:</div> 
                <div className='g-input-control'>
                    <input onChange = {(e) => this.setState({rest_zipcode : e.target.value})} type="number" className="form-control"  
                     name="rest_zipcode" placeholder="Enter restaurant's zipcode" required />
                </div>
            </div>
            <div className='g-action-panel'>
                 <button className="btn btn-outline-primary" type="button" onClick={() => this.setState({gotoLogin: true})} >GO TO LOGIN</button>
                 <button className="btn btn-primary" type="submit">REGISTER</button>
            </div>
        </form>
        </div>
        )
       
    }
    registerSeller(e) {
        e.preventDefault();
        if(this.state.password !== this.state.confirmpassword) {
            this.props.setMessage({
                msg: 'Passwords do not match',
                name: 'danger'
            })
        } else {
            this.props.signup(this.state);
        }
    }
}
const mapStateToProps = state => {
    return {
        isSignedUp: state.signUpReducer.isSellerSignedUp
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      signup: payload => dispatch(signupSeller(payload)),
      setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpSeller);