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

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

// shop actions

export const requestShopData = () => ({
  type: "REQUEST_SHOP_DATA",
});

export const receiveShopData = (data) => ({
  type: "RECEIVE_SHOP_DATA",
  data,
});

export const receiveShopDataError = () => ({
  type: "RECEIVE_SHOP_DATA_ERROR",
});

export const createShop = () => ({
  type: "CREATE_SHOP",
});

export const updateShop = () => ({
  type: "UPDATE_SHOP",
});

// inventory actions

export const addInventoryItem = item => ({
  type: 'ADD_ITEM',
  item,
});