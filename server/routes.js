const router = require("express").Router();

const { getUser, createUser, modifyUser, deleteUser } = require('./userHandlers');
const { getCart, replaceCart } = require('./cartHandlers');
const { getShop, createShop, modifyShop, deleteShop } = require('./shopHandlers');
const { getItem, getAllItems, createItem, modifyItem, deleteItem, getAllItemsByPostCode, getAllItemsInCart } = require('./itemHandlers');
const { getOrder, createOrder, modifyOrder, deleteOrder } = require('./orderHandlers');
const { getPostcodes } = require('./postcodeHandlers');

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

// Can we just brute force this? Like... I don't really have to
// be granular, since we're storing the cart also in state in FE.
// So can I just... replace the cart, every single time?

// replaceOne with upsert flag?

router.get('/api/cart/:id', getCart);
router.post('/api/cart', replaceCart);

// store management routes

router.get('/api/shop', getShop);
router.post('/api/shop', createShop);
router.patch('/api/shop', modifyShop);
router.delete('/api/shop', deleteShop);

// item management routes

router.get('/api/item/all/:id?', getAllItems);
router.get('/api/item/postcode/:postcode', getAllItemsByPostCode);
router.get('/api/item/cart/:cart', getAllItemsInCart);
router.get('/api/item', getItem);
router.post('/api/item', createItem);
router.patch('/api/item', modifyItem);
router.delete('/api/item', deleteItem);

// order management routes

// router.get('/api/order', getOrder);
// router.post('/api/order', createOrder);
// router.patch('/api/order', modifyOrder);
// router.delete('/api/order', deleteOrder);

// postcode routes

router.get('/api/postcode/:postcode', getPostcodes);

module.exports = router;