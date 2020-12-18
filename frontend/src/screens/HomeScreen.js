import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
  // React hook that manages state, default state is empty, when changing products use setProducts function
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Hook used when component renders on page
  useEffect(() => {
    // First param is function, second is array that accept list of dependencies
    // Function will only run once
    const fetchData = async () => {
      try {
        setLoading(true);
        // data from backend transferred to front end
        // Retrieves data from axios, array from backend transferred to front end
        const { data } = await axios.get('/api/products');
        setLoading(false);
        // Products hook holds data from backend
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    // Call fetch data after defining it
    fetchData();
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
