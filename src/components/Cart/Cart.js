import React, { useContext } from 'react';

import classes from "./Cart.module.css"
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartItems = cartCtx.items.map(item => <CartItem name={item.name} price={item.price} amount={item.amount} key={item.id} onAdd={cartItemAddHandler.bind(null, item)} onRemove={cartItemRemoveHandler.bind(null, item.id)} />);
    const hasItems = cartCtx.items.length > 0;
    return (
        <Modal onClose={props.onClose}>
            <div>
                <ul className={classes["cart-items"]}>
                    {cartItems}
                </ul>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes[`button--alt`]} onClick={props.onClose}>Close</button>
                    {hasItems && <button className={classes.button}>Order</button>}
                </div>
            </div>
        </Modal>
    )
}

export default Cart