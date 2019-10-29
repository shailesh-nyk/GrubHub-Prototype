import { GETSECTIONS , GETITEMS, RELOADMENU, SELECTRESTAURANT } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';

const getSectionsDispatcher = (payload) => {
  return { 
      type: GETSECTIONS, payload
  };
}

const getItemsDispatcher = (payload) => {
    return { 
        type: GETITEMS, payload
    };
}
const reloadMenu = () => {
    return { 
        type: RELOADMENU
    };
}

export const getSections = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/seller/sections', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200) {
                    dispatch(getSectionsDispatcher(resp.data.msgDesc))
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't fetch the menu sections. Please reload the page",
                        name: 'warning'
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

export const getItems = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/seller/menu', {
            params: payload
        })
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200) {
                    dispatch(getItemsDispatcher(resp.data.msgDesc))
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't fetch the menu items. Please reload the page",
                        name: 'warning'
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

export const addSection = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/seller/sections', payload)
        .then(resp => {
                dispatch(stopLoader());
                if(resp.status === 200 && resp.data.success) {
                    dispatch(setMessage({
                        msg: "Successfully added new section to your menu",
                        name: 'success'
                    }))
                    dispatch(reloadMenu());
                } else {
                    dispatch(setMessage({
                        msg: "We couldn't add new section. Please try again",
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
}

export const addItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post(config.api_host + '/seller/menu', payload)
        .then(resp => {
                if(resp.data.success && payload.image) {
                    const data = new FormData();
                    data.append('file', payload.image, resp.data.msgDesc);
                    axios.post(config.api_host + '/uploads/item', data)
                    .then(resp => {
                        dispatch(stopLoader())
                        if(resp.data.success){
                            dispatch(setMessage({
                                msg: "Successfully added new item to your menu",
                                name: 'success'
                            }))
                            dispatch(reloadMenu());
                         } else {
                            dispatch(setMessage({
                                msg: "We couldn't add new item. Please try again",
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
                } else if(resp.data.success) {
                    dispatch(stopLoader());
                    dispatch(setMessage({
                        msg: "Successfully added new item to your menu",
                        name: 'success'
                    }))
                    dispatch(reloadMenu());
                } else {
                    dispatch(stopLoader())
                    dispatch(setMessage({
                        msg: "We couldn't add new item. Please try again",
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
}

export const editSection = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.put(config.api_host + '/seller/sections', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(reloadMenu());
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

export const deleteSection = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.delete(config.api_host + '/seller/sections', { data: payload })
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(reloadMenu());
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

export const editItem = (payload) => {
    return dispatch => {
            dispatch(startLoader());
            if(payload.image) {
                const data = new FormData();
                data.append('file', payload.image, payload.item_id.toString());
                axios.post(config.api_host + '/uploads/item', data)
                .then(resp => {
                    dispatch(stopLoader())
                    if(resp.data.success){
                        dispatch(updateItem(payload));
                    } else {
                        dispatch(setMessage({
                            msg: "We couldn't update your item. Please try again",
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
            } else {
                dispatch(updateItem(payload));
            }
    };
}
export const updateItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.put(config.api_host + '/seller/menu', payload)
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(reloadMenu());
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
    
export const deleteItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.delete(config.api_host + '/seller/menu', { data: payload })
        .then(resp => {
            dispatch(stopLoader())
            if(resp.data.success){
                dispatch(reloadMenu());
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

export const setSectionSortOrder = (payload) => {
    return dispatch => {
        axios.post(config.api_host + '/seller/update-sort-order', payload)
    };
}

export const selectRestaurant = (payload) => {
    return { 
        type: SELECTRESTAURANT , payload
    };
}