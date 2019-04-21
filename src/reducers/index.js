import { combineReducers } from "redux";

import client from "./client";
import cart from "./shoppingCart";

export default combineReducers({
    client,
    cart
})