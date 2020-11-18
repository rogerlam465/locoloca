const router = require("express").Router();

// good god, what a mess. There's got to be a cleaner way to do this.

const { getUser, createUser, modifyUser, deleteUser, validateUserPassword } = require('./userHandlers');
const { getCart, replaceCart, clearCart } = require('./cartHandlers');
const { getShop, createShop, modifyShop, deleteShop } = require('./shopHandlers');
const { getItem, getAllItems, createItem, modifyItem, deleteItem, getAllItemsByPostCode, getAllItemsInCart } = require('./itemHandlers');
const { getOrder, createOrder, modifyOrderStatus, assignCourier, getCourierOrders, getShopOrders } = require('./orderHandlers');
const { getPostcodes } = require('./postcodeHandlers');

// TODO:

// /api/user (get, put, patch, delete)
// /api/user/cart (get, patch, delete)
// /api/store (get, put, patch, delete)

// all the get things *look* similar, but honestly, maybe
// they need to be separate things for the sake of separation
// of concerns

// user management routes

router.get('/api/user/:id', getUser);
router.post('/api/user/login', validateUserPassword);
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
router.delete('/api/cart', clearCart);

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

router.get('/api/order/', getOrder);
router.get('/api/order/shop/:shop', getShopOrders);
router.post('/api/order/', createOrder);
router.get('/api/order/courier/:courierId', getCourierOrders);
router.patch('/api/order/courier', assignCourier);
router.patch('/api/order/', modifyOrderStatus);


// postcode routes

router.get('/api/postcode/:postcode', getPostcodes);

module.exports = router;