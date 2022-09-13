import React, { useState } from "react";

const CartState = React.createContext({
    isCartVisible: false,
    showCartHandler: () => { },
    hideCartHandler: () => { }
});

export const CartStateProvider = props => {
    const cartIsVisible = () => {
        setIsCartVisible(true);
    }
    const cartIsHidden = () => {
        console.log(isCartVisible);
        setIsCartVisible(false);
    }
    const [isCartVisible, setIsCartVisible] = useState(false);
    return <CartState.Provider value={{ isCartVisible, showCartHandler: cartIsVisible, hideCartHandler: cartIsHidden }}>
        {props.children}
    </CartState.Provider>
}

export default CartState;