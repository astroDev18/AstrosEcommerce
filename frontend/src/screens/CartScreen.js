import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";
import './CartScreen.css';


export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler = (id) => {
        // Delete Action
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className='checkout_outerContainer'>
            <div className='checkout_columnTwo'>
                <h1 className='checkout_Header'>Shopping Cart</h1>
                {cartItems.length === 0 ? <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    :
                    (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className='checkout_innerContainer'>
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="small"
                                            ></img>
                                        </div>
                                        <div>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select
                                                className='checkout_price'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='checkout_price'>${item.price}</div>
                                        <div>
                                            <button className="checkout_Button"
                                                type="button"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
            <div className='checkout_columnOne'>
                <div>
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="checkout_button"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}