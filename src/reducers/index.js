import { combineReducers } from "redux";

import inventory from './inventory-reducer';
import user from './user-reducer';

export default combineReducers({ inventory, user });