import { GETBUYER, UPDATEBUYER, GETSELLER, UPDATESELLER,
UPDATEBUYERIMAGE, UPDATESELLERIMAGE } from "../actions/action-types";

const initialState = {
    user: {},
    seller: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETBUYER: {
      return {
          ...state,
          user: action.payload
      };
    }
    case UPDATEBUYER: {
        localStorage.setItem('user1', JSON.stringify(action.payload.user));
        return {
            ...state,
            user: action.payload.user
        }; 
    }
    case UPDATEBUYERIMAGE: {
        return {
            ...state,
            user: {
                ...state.user,
                image: action.payload.imgurl
            }
        }; 
    }
    case GETSELLER: {
        return {
            ...state,
            seller: action.payload
        };
      }
      case UPDATESELLER: {
          localStorage.setItem('user2', JSON.stringify(action.payload.user));
          return {
              ...state,
              seller: action.payload.user
          }; 
      }
      case UPDATESELLERIMAGE: {
        return {
            ...state,
            seller: {
                ...state.seller,
                image: action.payload.imgurl
            }
        }; 
    }
    default:
      return state;
  }
}

export default profileReducer;
