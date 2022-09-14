import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';


import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const numberOfCartItem = cartCtx.items.reduce((accumulator, currItem) => {
        return accumulator + currItem.amount;
    }, 0)
    const [btnIsHighlighted, setBtnIsHighlight] = useState(false);
    const { items } = cartCtx;
    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlight(true)
        const timer = setTimeout(() => {
            setBtnIsHighlight(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    const classname = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
    return (
        <button onClick={props.onClick} className={classname}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
    )
}


export default HeaderCartButton;