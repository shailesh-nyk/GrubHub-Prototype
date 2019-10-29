import { GETSECTIONS, GETITEMS, RELOADMENU,SELECTRESTAURANT  } from "../actions/action-types";

const initialState = {
    sections: [],
    items: [],
    sectionsFetched: false,
    itemsFetched: false,
    selectedOrderRest: null
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETSECTIONS: {
      return {
          ...state,
          sections: action.payload,
          sectionsFetched: true
      };
    }
    case GETITEMS: {
        return {
            ...state,
            items: action.payload,
            itemsFetched: true,
        };
    }
    case RELOADMENU: {
        return {
          ...state,
          itemsFetched: false,
          sectionsFetched: false
      };
    }
    case SELECTRESTAURANT: {
      return {
        ...state,
        selectedOrderRest: action.payload
      };
    } 
    default:
      return state;
  }
}

export default menuReducer;
