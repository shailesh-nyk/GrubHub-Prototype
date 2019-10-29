 import { SETCARTCOUNT, ORDERSUCCESS, CUSTOMERORDERS, RESTAURANTORDERS , SETUPORDERCHAT} from "../actions/action-types";

const initialState = {
    cart_change: true,
    order_successful: false,
    customer_orders: [],
    rest_orders: [],
    messages: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SETCARTCOUNT: {
          return {
             ...state,
             cart_change: !state.cart_change
          };
      }
      case ORDERSUCCESS: {
        return {
           ...state,
           order_successful: true
        };
     }
     case CUSTOMERORDERS: {
       return {
         ...state,
         customer_orders: action.payload
       }
     }
     case RESTAURANTORDERS: {
      return {
        ...state,
        rest_orders: action.payload
      }
    }
    case SETUPORDERCHAT: {
      return {
        ...state,
        messages: action.payload
      }
    }
      default:
        return state;
    }
  }
  export default orderReducer;