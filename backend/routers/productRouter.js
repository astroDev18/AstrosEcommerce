import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import data from '../data.js';
const productRouter = express.Router()

productRouter.get(
  '/', async (req, res) => {
    try {
        console.log('Hit product')
        const products = await Product.find({});
        console.log(products)
        return res.send(products);
    } catch (e) {
        console.error(e);
        return res.send('Something went wrong');
    }
  }
);

productRouter.get(
  '/seed',
  async (req, res) => {
    // await Product.remove({});
      try {
          const createdProducts = await Product.insertMany(data.products);
          res.send({ createdProducts });
      } catch (e) {
          console.error(e);
          res.send('Something went wrong');
      }
  }
);

productRouter.get(
  '/:id',
  async (req, res) => {
    const product = await Product.findById(req.params.id);
    try {
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (e) {
        console.error(e);
        res.send('Something went wrong');
    }
  }
);

export default productRouter;