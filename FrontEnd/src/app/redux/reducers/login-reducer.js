import { LOGINBUYER , LOGINSELLER, LOGOUTSELLER ,LOGOUTBUYER, SETAUTHBUYER, SETAUTHSELLER } from "../actions/action-types";

const initialState = {
    isAuthenticatedBuyer: false,
    isAuthenticatedSeller: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINBUYER: {
      localStorage.setItem('user1', JSON.stringify(action.payload.msgDesc));
      localStorage.setItem('token', action.payload.msgDesc.token);
      localStorage.removeItem('user2');
      return {
          ...state,
          isAuthenticatedBuyer: true
      };
    }
    case LOGINSELLER: {
        localStorage.setItem('user2', JSON.stringify(action.payload.msgDesc));
        localStorage.setItem('token', action.payload.msgDesc.token);
        localStorage.removeItem('user1');
        return {
            ...state,
            isAuthenticatedSeller: true
        };
    }
    case LOGOUTSELLER: {
      localStorage.removeItem('user2');
      localStorage.removeItem('token');
      return {
          ...state,
          isAuthenticatedSeller: false
      };
    }
    case LOGOUTBUYER: {
      localStorage.removeItem('user1');
      localStorage.removeItem('token');
      return {
          ...state,
          isAuthenticatedBuyer: false
      };
    }
    case SETAUTHBUYER: {
      return {
        ...state,
        isAuthenticatedBuyer: true
      };
    }
    case SETAUTHSELLER: {
      return {
        ...state,
        isAuthenticatedSeller: true
      };
    } 
    default:
      return state;
  }
}

export default loginReducer;
