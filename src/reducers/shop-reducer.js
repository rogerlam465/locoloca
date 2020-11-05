const initialState = {
  status: "idle",
};

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_SHOP_DATA': {
      return {
        ...state,
        status: "loading",
      };
    }
    case 'RECEIVE_SHOP_DATA': {
      return {
        ...state,
        userData: action.data,
        status: 'complete',
      };
    }
    case 'RECEIVE_SHOP_DATA_ERROR': {
      return {
        ...state,
        status: 'error',
      };
    }
    case 'REQUEST_CREATE_SHOP': {
      return {
        ...state,
        status: "loading",
      }
    }
    case 'REQUEST_UPDATE_SHOP': {
      return {
        ...state,
        status: "loading",
      }
    }
    default:
      return state;
  }
}