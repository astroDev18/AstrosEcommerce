import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';
import './ProductScreen.css';

export default function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  if(!product) {
    return <div>Product Not Found</div>;
  }
  return <div className='layout_center'>
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
  </div>
}
