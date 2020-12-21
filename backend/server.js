import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
const app = express();
import jwt from 'jsonwebtoken';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use('/api/products', productRouter);
app.use(express.json())
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//   console.log(token)
//
//   const data = jwt.verify(token, 'thisismynewcourse')
//   console.log(data)
// }
//
// myFunction()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
