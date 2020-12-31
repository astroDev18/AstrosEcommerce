import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsOrder} from "../actions/orderActions";
import './orderScreen.css'
import Axios from "axios";
import { PayPalButton } from 'react-paypal-button-v2';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;
    const [sdkReady, setSDKReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSDKReady(true);
            };
            document.body.appendChild(script);
        }
        if (!order) {
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSDKReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady]);


    const successPaymentHandler = () => {
        // TODO: dispatch payment
    }

    return loading ? (<LoadingBox> </LoadingBox>) :
        error ? (<MessageBox variant='danger'>{error}</MessageBox>)
            :
            (
                <div className='order_container'>
                    <h1>Order {order._id}</h1>
                    <div className='row top order_container'>
                        <div className='col-2'>
                            <ul>
                                <li>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.shippingAddress.fullName} <br/>
                                        <strong>Address: </strong> {order.shippingAddress.address},
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <MessageBox variant="success">
                                            Delivered at {order.deliveredAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">Not Delivered</MessageBox>
                                    )}
                                </li>
                                <li>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Name: </strong> {order.paymentMethod}
                                    </p>

                                    {order.isPaid ? (
                                        <MessageBox variant="success">
                                            Paid at {order.paidAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">Not Paid</MessageBox>
                                    )}
                                </li>
                                <li>
                                    <h2>Order Items</h2>
                                    <ul className='checkout_orderItems'>
                                        {order.orderItems.map((item) => (
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
                                                        <Link className='checkout_item' to={`/product/${item.product}`}>{item.name}</Link>
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
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className='row'>
                                            <div><strong>Tax</strong></div>
                                            <div>
                                                ${order.taxPrice.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div><strong>Order Total</strong></div>
                                            <div>
                                                <CurrencyFormat value={`${order.totalPrice}`}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}/>
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady? (<LoadingBox>
                                                    </LoadingBox>) :
                                                    (
                                                        <PayPalButton amount={order.totalPrice}
                                                                      onSuccess={successPaymentHandler}>
                                                        </PayPalButton>
                                                    )
                                                }
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}