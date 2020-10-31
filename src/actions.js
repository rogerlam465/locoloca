// user actions

export const requestUserData = () => ({
  type: "REQUEST_USER_DATA",
});

export const receiveUserData = (data) => ({
  type: "RECEIVE_USER_DATA",
  data,
});

export const receiveUserDataError = () => ({
  type: "RECEIVE_USER_DATA_ERROR",
});

// inventory actions

export const addInventoryItem = item => ({
  type: 'ADD_ITEM',
  item,
});