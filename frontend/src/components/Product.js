import React from 'react';
import Rating from './Rating';


export default function Product(props) {
    const { product } = props;
    return (
        <div>
            <div key={product._id} className="card_home">
                <a href={`/product/${product._id}`}>
                    <img
                        className="card_image"
                        src={product.image}
                        alt={product.name}
                    />
                </a>
                <div className="card_body">
                    <a href={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </a>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <div className="card_price">${product.price}</div>
                </div>
            </div>
        </div>
    )
}
