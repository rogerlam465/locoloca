const initialState = {
  status: "idle",
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,

      }
    default:
      return state;
  }
}