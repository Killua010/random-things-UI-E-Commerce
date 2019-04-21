export function setShoppingCart(cart) {
    return {
        type: 'INSERT_CART',
        cart: cart
    }
}