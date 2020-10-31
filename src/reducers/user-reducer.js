const initialState = {
  status: "idle",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_DATA':
      return {
        ...state,
        status: "loading",
      }
    default:
      return state;
  }
}