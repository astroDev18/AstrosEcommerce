import React, { useEffect} from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from "../actions/productActions";

export default function HomeScreen() {
  // Hook allows us to dispatch any redux action inside our react components
  const dispatch = useDispatch();
    // Gets product list from redux store after updating
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Hook used when component renders on page
  useEffect(() => {
    // Dispatch redux action that updates redux store
    dispatch(listProducts())
  }, []);
  return (
      <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (<div className='main'>
          <h1 className='main_title'>Products</h1>
          <div className="cards">
            {products.map((product) => (
                <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </div>
        )}
      </div>
  );
}
