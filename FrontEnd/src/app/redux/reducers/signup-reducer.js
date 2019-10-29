import { SIGNUPBUYER , SIGNUPSELLER } from "../actions/action-types";


const initialState = {
    isBuyerSignedUp: false,
    isSellerSignedUp: false
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUPBUYER: {
      return {
          ...state,
          isBuyerSignedUp: true
      };
    }
    case SIGNUPSELLER: {
        return {
            ...state,
            isSellerSignedUp: true
        };
    }
    default:
      return state;
  }
}

export default signUpReducer;
