import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './SigninScreen.css';
import { register } from '../actions/userActions';
import {signin} from "../actions/userActions";

export default function SigninScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo } = userRegister;

    const dispatch = useDispatch();
    console.log(userRegister);

    const submitHandler = (e) => {
        e.preventDefault();
        //    Sign in action
        if (password !== confirmPassword) {
            alert('Password does not match')
        } else {
            dispatch(register(name, email, password))
        }
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
                    <h1 className='signin_title'>Create Account</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
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
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="button" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}