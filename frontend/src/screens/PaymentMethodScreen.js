import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from "../actions/cartActions";

export default function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeholder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
            <div>
                <h1 className={'payment_heading'}>Payment</h1>
            </div>
            <div>
                <div>
                    <input type="radio"
                           id='paypal'
                           value='PayPal'
                           name='paymentMethod'
                           required checked
                           onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal">PayPal</label>
                </div>
            </div>
            <div>
                <div>
                    <input type="radio"
                           id='stripe'
                           value='Stripe'
                           name='paymentMethod'
                           required
                           onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="stripe">Stripe</label>
                </div>
            </div>
            <div>
                <label />
                <button className="button" type="submit">
                    Continue
                </button>
            </div>
            </form>
        </div>
    )
};