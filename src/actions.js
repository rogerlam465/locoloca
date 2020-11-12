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

// cart actions

// most actions can be used to update the BE dynamically
// however, fetching the initial data should be done upon
// first login

export const addItemToCart = (item) => ({
  type: "ADD_ITEM_TO_CART",
  item,
});

export const modifyItemInCart = (itemDetails) => ({
  type: "MODIFY_ITEM_IN_CART",
  itemDetails,
});

export const deleteItemInCart = (item) => ({
  type: "DELETE_ITEM_IN_CART",
  item,
});

export const requestCartData = () => ({
  type: "REQUEST_CART_DATA",
});

export const receiveCartData = () => ({
  type: "RECEIVE_CART_DATA",
})

export const receiveCartDataError = () => ({
  type: "RECEIVE_CART_DATA_ERROR",
})

export const clearCart = () => ({
  type: "CLEAR_CART",
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