import { combineReducers } from "redux";

import inventory from './inventory-reducer';
import user from './user-reducer';
import shop from './shop-reducer';
import cart from './cart-reducer';

// we don't actually need inventory or shop, probably.
// neither of them benefit from redux in the sense of global state

export default combineReducers({ inventory, user, shop, cart });