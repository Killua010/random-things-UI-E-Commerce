import { combineReducers } from "redux";

import client from "./client";
import cart from "./shoppingCart";
import search from "./search";
import auth from "./auth";

export default combineReducers({
	client,
	cart,
	search,
	auth
});