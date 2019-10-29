import { GETBUYER, UPDATEBUYER, GETSELLER, UPDATESELLER, 
UPDATEBUYERIMAGE, UPDATESELLERIMAGE } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';
//BUYER PROFILE RELATED


const getBuyerDispatcher = (payload) => {
  return { 
      type: GETBUYER, payload 
  };
}
const updateBuyerDispatcher = (payload) => {
    return { 
        type: UPDATEBUYER, payload 
    };
}

const updateBuyerImageDispatcher = (payload) => {
    return { 
        type: UPDATEBUYERIMAGE, payload 
    };
}


export const getBuyer = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/buyer', {
            params: payload
         })
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(getBuyerDispatcher(resp.data.msgDesc))
            } 
        }) 
    }; 
}
export const updateBuyer = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.put(config.api_host + '/buyer', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(updateBuyerDispatcher({
                    user: payload
                }))
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
        }) 
        .catch(err => {
            dispatch(stopLoader())
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            })) 
        })
    }; 
}
export const updateBuyerImage = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/uploads/buyer', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(updateBuyerImageDispatcher({
                    imgurl: resp.data.msgDesc
                }))
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
        }) 
        .catch(err => {
            dispatch(stopLoader())
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            })) 
        })
    }; 
}

//SELLER PROFILE RELATED


const getSellerDispatcher = (payload) => {
    return { 
        type: GETSELLER, payload 
    };
  }
  const updateSellerDispatcher = (payload) => {
      return { 
          type: UPDATESELLER, payload 
      };
  }

const updateSellerImageDispatcher = (payload) => {
    return { 
        type: UPDATESELLERIMAGE, payload 
    };
}
  
  export const getSeller = (payload) => {
      return dispatch => {
          dispatch(startLoader());
          axios.get(config.api_host + '/seller', {
              params: payload
           })
          .then(resp => {
              dispatch(stopLoader())
              if(resp.data.success){
                  dispatch(getSellerDispatcher(resp.data.msgDesc))
              } 
          }) 
      }; 
  }
  export const updateSeller = (payload) => {
      return dispatch => {
          dispatch(startLoader());
          axios.put(config.api_host + '/seller', payload)
          .then(resp => {
              dispatch(stopLoader())
              if(resp.data.success){
                  dispatch(updateSellerDispatcher({
                      user: payload
                  }))
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
          }) 
          .catch(err => {
              dispatch(stopLoader())
              dispatch(setMessage({
                  msg: "Something went wrong",
                  name: 'danger'
              })) 
          })
      }; 
  }
  export const updateSellerImage = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/uploads/seller', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(updateSellerImageDispatcher({
                    imgurl: resp.data.msgDesc
                }))
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
        }) 
        .catch(err => {
            dispatch(stopLoader())
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            })) 
        })
    }; 
}