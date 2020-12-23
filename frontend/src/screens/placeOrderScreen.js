import React from 'react';
import {useSelector} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format'

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.05 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const placeOrderHandler = () => {
        //    TODO: dispatch place order
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Address: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                            </p>
                        </li>
                        <li>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {cart.paymentMethod}
                            </p>
                        </li>
                        <li>
                            <h2>Order Items</h2>
                            <ul>
                                {cart.cartItems.map((item) => (
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
                                            <div className='checkout_price'>${item.qty} x ${item.price} =
                                                ${item.qty * item.price}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className='row'>
                                    <div><strong>Tax</strong></div>
                                    <div>
                                        ${cart.taxPrice.toFixed(2)}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div>
                                        <CurrencyFormat value={`${cart.totalPrice}`}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='button block'
                                        disabled={cart.cartItems.length === 0}>Purchase</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}