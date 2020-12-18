import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import './ProductScreen.css';
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsProduct} from "../actions/productActions";

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    // Fetch date to display product
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])

    return <div className='layout_center'>
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className='layout top'>
                    <div className='col_2'>
                        <Link to='/' className='layout_back'>Back to Homepage</Link>
                        <img className='layout_image' src={product.image} alt={product.name}/>
                    </div>
                    <div className='layout_content'>
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={product.rating}
                                        numReviews={product.numReviews}>
                                </Rating>
                            </li>
                            <li>Price : ${product.price}</li>
                            <li>
                                Description:<p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className='layout_purchase'>
                        <div className='card'>
                            <ul>
                                <li>
                                    <div className='layout_checkout'>
                                        <div>Price</div>
                                        <div className='price'>${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className='row'>
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock > 0 ? (
                                                <span className='success'>In Stock</span>
                                            ) : (
                                                <span className='danger'>Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button className='primary button block'>Add To Cart</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}
