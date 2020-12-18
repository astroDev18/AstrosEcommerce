import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // Retrieve item from payload
            const item = action.payload;
            // Compare adding item with added item to see if it matches
            const existItem = state.cartItems.find(x => x.product === item.product);
            // Replace old data
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {...state, cartItems: [...state.cartItems, item]};
            }

        // Concats items to incoming array
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        default:
            return state;
    }
}