const initialState = {
  status: "idle",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_DATA': {
      return {
        ...state,
        status: "loading",
      };
    }
    case 'RECEIVE_USER_DATA': {
      return {
        ...state,
        userData: action.data,
        status: 'complete',
      };
    }
    case 'RECEIVE_USER_DATA_ERROR': {
      return {
        ...state,
        status: 'error',
      };
    }
    default:
      return state;
  }
}