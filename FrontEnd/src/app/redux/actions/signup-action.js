import { SIGNUPBUYER , SIGNUPSELLER  } from "./action-types";
import config from '../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

const signupBuyerDispatcher = (payload) => {
  return { 
      type: SIGNUPBUYER, payload 
  };
}
const signupSellerDispatcher = (payload) => {
    return { 
        type: SIGNUPSELLER, payload 
    };
}

export const signupBuyer = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/register-buyer', payload) 
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.success){
                dispatch(signupBuyerDispatcher());
                dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                }))
            } else {
                dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'danger'
                })) 
            }
        }, err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                    msg: "Something went wrong",
                    name: 'danger'
            })) 
        });
    };
};
export const signupSeller = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/register-seller', payload) 
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.success){
                dispatch(signupSellerDispatcher());
                dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                }))
            } else {
                dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'danger'
                })) 
            }
        }, err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                    msg: "Something went wrong",
                    name: 'danger'
            })) 
        });
    };
};
