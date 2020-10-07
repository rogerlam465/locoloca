const router = require("express").Router();

const { } = require('./handlers');

// TODO:

// /api/user (get, put, patch, delete)
// /api/user/cart (get, patch, delete)
// /api/store (get, put, patch, delete)

// y'know, all the get/delete routes are very similar and simple.
// Can we just create a fetch helper?

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

router.get('/api/store', getStore);
router.post('/api/store', createStore);
router.patch('/api/store', modifyStore);
router.delete('/api/store', deleteStore);

// item management routes

router.get('/api/item', getItem);
router.post('/api/store', createItem);
router.patch('/api/item', updateItem);
router.delete('/api/item', deleteItem);