import { combineReducers } from "redux";

import client from "./client";
import cart from "./shoppingCart";
import search from "./search";

export default combineReducers({
	client,
	cart,
	search
});