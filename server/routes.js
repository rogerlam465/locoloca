const router = require("express").Router();

const { getUser, createUser, modifyUser, deleteUser } = require('./userHandlers');
const { getCart, modifyCart, clearCart } = require('./cartHandlers');
const { getShop, createShop, modifyShop, deleteShop } = require('./shopHandlers');
const { getItem, createItem, updateItem, deleteItem } = require('./itemHandlers');

// TODO:

// /api/user (get, put, patch, delete)
// /api/user/cart (get, patch, delete)
// /api/store (get, put, patch, delete)

// all the get things *look* similar, but honestly, maybe
// they need to be separate things for the sake of separation
// of concerns

// user management routes

router.get('/api/user', getUser);
router.post('/api/user', createUser);
router.patch('/api/user', modifyUser);
router.delete('/api/user', deleteUser);

// cart management routes

router.get('/api/user/cart', getCart);
router.patch('/api/user/cart', modifyCart);
router.delete('/api/user/cart', clearCart);

// store management routes

router.get('/api/shop', getShop);
router.post('/api/shop', createShop);
router.patch('/api/shop', modifyShop);
router.delete('/api/shop', deleteShop);

// item management routes

router.get('/api/item', getItem);
router.post('/api/store', createItem);
router.patch('/api/item', updateItem);
router.delete('/api/item', deleteItem);