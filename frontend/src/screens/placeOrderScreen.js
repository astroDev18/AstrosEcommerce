import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format'
import {createOrder} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.05 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
       console.log()
       dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

    };

    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch, order, props.history, success]);
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top order_container'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Address: </strong> <br/> {cart.shippingAddress.address}, <br/>
                                {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, <br/>
                                {cart.shippingAddress.country}
                            </p>
                        </li>
                        <li>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </p>
                        </li>
                        <li>
                            <h2>Order Items</h2>
                            <ul className='checkout_orderItems'>
                                {cart.cartItems.map((item) => (
                                    <li  key={item.product}>
                                        <div className='checkout_innerContainer'>
                                            <div>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="small"
                                                ></img>
                                            </div>
                                            <div>
                                                <Link className='checkout_item' to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className='checkout_price'> {item.qty} x ${item.price} =
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
                                        <CurrencyFormat value={`${cart.totalPrice.toFixed(2)}`}
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
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant={'danger'}>{error}</MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}