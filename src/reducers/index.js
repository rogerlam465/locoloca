import { combineReducers } from "redux";

import inventory from './inventory-reducer';
import user from './user-reducer';
import shop from './shop-reducer';

export default combineReducers({ inventory, user, shop });