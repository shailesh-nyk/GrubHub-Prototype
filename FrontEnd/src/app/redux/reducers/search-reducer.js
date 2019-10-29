import { SEARCHBYITEMFAILED, SEARCHBYITEM, SETCUISINES, CLEARSEARCH } from "../actions/action-types";

const initialState = {
    isSearched: false,
    resultRestaurants: [],
    cuisine: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCHBYITEM: {
          return {
             ...state,
             isSearched: true,
             resultRestaurants: action.payload
          };
      }
      case SEARCHBYITEMFAILED: {
         return {
            ...state,
            isSearched: true,
            resultRestaurants: []
         };
      }
      case SETCUISINES: {
        return {
          ...state,
          cuisine: action.payload
        }
      }
      case CLEARSEARCH: {
        return {
            ...state,
            isSearched: false,
            resultRestaurants: []
        }
      }
      default:
        return state;
    }
  }
  export default searchReducer;