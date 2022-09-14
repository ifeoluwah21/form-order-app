import React, { useReducer } from "react";
import CartContext from "./cart-context";


const cartReducer = (prevState, action) => {
    if (action.type === `ADD_TO_CART`) {
        // if (prevState.items.some(item => item.id === action.item.id)) {
        //     const updatedItems = [...prevState.items];
        //     const indexOfItem = updatedItems.findIndex(item => item.id === action.item.id);

        //     const updatedItem = { ...updatedItems[indexOfItem] };
        //     updatedItem.amount = action.item.amount;
        //     updatedItems[indexOfItem] = updatedItem;
        //     return { items: updatedItems, totalAmount: prevState.totalAmount + action.item.price * (updatedItem.amount - prevState.items[indexOfItem].amount) };
        // }

        const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        const existingItem = prevState.items[existingItemIndex];
        let updatedItems;
        if (existingItem) {
            const updatedItem = {
                ...existingItem, amount: existingItem.amount + action.item.amount
            };

            updatedItems = [...prevState.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = prevState.items.concat(action.item);
        }
        return { items: updatedItems, totalAmount: updatedTotalAmount }
    } else if (action.type === `REMOVE_FROM_CART`) {
        const existingItemIndex = prevState.items.findIndex(item => item.id === action.id);
        const existingItem = prevState.items[existingItemIndex];
        const totalAmount = prevState.totalAmount - existingItem.price;
        const precisedNum = totalAmount.toPrecision();
        const num = +precisedNum
        const numToFixed = num.toFixed(2);
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = prevState.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...prevState.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return { items: updatedItems, totalAmount: +numToFixed };
    }
}

const defaultCartState = { items: [], totalAmount: 0 }
const CartContextProvider = (props) => {

    const [CartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({ type: `ADD_TO_CART`, item: item })
    }
    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: `REMOVE_FROM_CART`, id: id })
    }
    const cartContext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;