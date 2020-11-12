const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CART_DATA': {
      return {
        ...state,
        status: "loading",
      };
    }
    case 'RECEIVE_CART_DATA': {
      return {
        ...state,
        userData: action.data,
        status: 'complete',
      };
    }
    case 'RECEIVE_CART_DATA_ERROR': {
      return {
        ...state,
        status: 'error',
      };
    }
    case 'ADD_ITEM_TO_CART': {
      return {
        ...state,
        [action.item[0]]: [action.item[1]]
      };
    }
    case 'MODIFY_ITEM_IN_CART': {
      return {
        ...state,
        cartData: action.data,
      };
    }
    case 'DELETE_ITEM_IN_CART': {
      return {
        ...state,
      };
    }
    case 'CLEAR_CART': {
      return {
        initialState,
      }
    }
    default:
      return state;
  }
}