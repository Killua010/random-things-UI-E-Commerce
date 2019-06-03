export default function shoppingCart(state = {quantityProduct:0}, action){
	switch(action.type){
	case "INSERT_CART":
		return action.cart;
	default:
		return state;
	}
}