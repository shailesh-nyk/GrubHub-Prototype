import React from 'react';
import { getBuyer, updateBuyer, updateBuyerImage } from './../../redux/actions/profile-action';
import { connect } from 'react-redux';
import config from './../../../app-config';
import { setMessage } from './../../redux/actions/util-action';

class BuyerProfile extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: null
        }
    }
    componentDidMount() {
        let id = JSON.parse(localStorage.getItem('user1'))._id;
        this.props.getBuyer({
            id: id
        })
    }
    componentWillReceiveProps(next) {
        Object.keys(next.user).forEach(key => {
            let element = document.getElementById(key);
            if(element) {
                element.value = next.user[key];
            }
        })
    }
    render() {
        return ( 
           <div> 
            <h3 style={{textAlign: 'center'}}>Your account</h3>
            <div className="g-profile-row">
                <div className="g-profile-avatar"><img src={config.base + this.props.user.image} alt="NO DISPLAY"/></div> 
                <div className="g-profile-details-section">
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Name</span>
                        <span className='g-primary-text'>{this.props.user.name}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Email</span>
                        <span className='g-primary-text'>{this.props.user.email}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Phone number</span>
                        <span className='g-primary-text'>{this.props.user.phone}</span>
                    </div>
                </div>
                <div className="g-profile-details-section">
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Address</span>
                        <span className='g-primary-text'>{this.props.user.address}</span>
                    </div>
                    <div className="g-profile-details"> 
                        <span className='g-secondary-text'>Zipcode</span>
                        <span className='g-primary-text'>{this.props.user.zipcode}</span>
                    </div>
                </div>
                <a className="btn btn-primary" data-toggle="collapse" href="#editNameCollapse" role="button" aria-expanded="false"
                 aria-controls="editNameCollapse" style={{float: 'right'}}>
                     Edit
                </a>
            </div> 
            <div className="collapse" id="editNameCollapse">
                <div className="card card-body">
                        <form onSubmit={(e) => this.updateProfile(e)}>
                             <div className='g-input-field'>
                                <div className='g-input-label'>Upload/Change picture:</div>
                                <div className='g-input-control'>
                                   <input type="file" accept="image/*" name="file"
                                    onChange={(e) => this.setState({selectedImg: e.target.files[0]})}/>
                                    <button className='btn btn-success btn-small' type='button' onClick={() => this.uploadImage()}>Upload</button>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Full Name:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="name" placeholder="Enter full name" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Email:</div>
                                <div className='g-input-control'>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email address" required readOnly/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Phone number:</div>
                                <div className='g-input-control'>
                                    <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" required pattern="^\d{10}$"/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>New Password:</div>
                                <div className='g-input-control'>
                                    <input type="password" className="form-control" id="newpassword" placeholder="Enter new password"/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Confirm Password:</div>
                                <div className='g-input-control'>
                                    <input type="password" className="form-control" id="confirmpassword" placeholder="Re-enter new password"/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Address:</div>
                                <div className='g-input-control'>
                                    <input type="text" className="form-control" id="address" placeholder="Enter address" required/>
                                </div>
                            </div>
                            <div className='g-input-field'>
                                <div className='g-input-label'>Zipcode:</div>
                                <div className='g-input-control'>
                                    <input type="number" className="form-control" id="zipcode" placeholder="Enter zipcode" required/>
                                </div>
                            </div>
                            <div className='g-action-panel'>
                                <button className="btn btn-outline-primary" data-toggle="collapse" href="#editNameCollapse" type="button" aria-expanded="false"
                                    aria-controls="editNameCollapse">
                                        CANCEL
                                </button>
                                <button className="btn btn-primary" type="submit">UPDATE</button>
                            </div>
                        </form>    
                </div>
            </div>
            </div>
        )
    }
    updateProfile(e) {
        e.preventDefault();
        if(document.getElementById('newpassword').value !== document.getElementById('confirmpassword').value) {
            this.props.setMessage({
                msg: 'Passwords do not match',
                name: 'danger'
            })
        } else {
            let user = {
            };
            Object.keys(this.props.user).forEach(key => {
                let element = document.getElementById(key);
                if(key === 'password') {
                    element = document.getElementById('newpassword');
                    if(element.value !== '') {
                        user.password = element.value;
                    } else {
                        user.password = JSON.parse(localStorage.getItem('user1')).password
                    }
                } else {
                    if(element) {
                        user[key] = element.value;
                    } else {
                        user[key] = this.props.user[key]
                    }
                }
            })
            this.props.updateBuyer(user);
        }
    }
    uploadImage() {
        if(this.state.selectedImg && (this.state.selectedImg.type.includes('jp')|| this.state.selectedImg.type.includes('png'))) {
            const data = new FormData();
            data.append('file', this.state.selectedImg, this.props.user._id);
            this.props.uploadPicture(data);
        } else {
            this.props.setMessage({
                msg: "Please select a valid image",
                name: 'danger'
            })
        }
    }
}
const mapStateToProps = state => {
    return {
       user: state.profileReducer.user
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      getBuyer: payload => dispatch(getBuyer(payload)),
      updateBuyer: payload => dispatch(updateBuyer(payload)),
      uploadPicture: payload => dispatch(updateBuyerImage(payload)),
      setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerProfile);