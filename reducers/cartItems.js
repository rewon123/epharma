const cartItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const alreadyAdded = state.find(crt => crt.id == action.payload.id);
            if (alreadyAdded) {
                const reamingCarts = state.filter(crt => state.id != action.payload);
                // setCart(reamingCarts);
                return reamingCarts
            } else {
                const newCart = [...state, action.payload]
                return newCart
            }

        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.id !== action.payload.id)

        case 'QUANTITY_HANDLER':
            const newCart = state.map(item => {
                if (item.id == action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            })

            const filteredCart = newCart.filter(item => item.quantity > 0)
            return(filteredCart);
    }

    return state
}

export default cartItems

