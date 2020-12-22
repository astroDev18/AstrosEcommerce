import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './SigninScreen.css';
import {signin} from "../actions/userActions";

export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //    Sign in action
        dispatch(signin(email, password))
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]);

    return (
        <div className='signin_container'>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className='signin_title'>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="button" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}