
import React from 'react';
import Rating from './Rating';
import {Link} from "react-router-dom";


export default function Product(props) {
    const { product } = props;
    return (
        <div>
            <div key={product._id} className="card_home">
                <Link to={`/product/${product._id}`}>
                    <img
                        className="card_image"
                        src={product.image}
                        alt={product.name}
                    />
                </Link>
                <div className="card_body">
                    <Link to={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}>
                    </Rating>
                    <div className="card_price">${product.price}</div>
                </div>
            </div>
        </div>
    )
}