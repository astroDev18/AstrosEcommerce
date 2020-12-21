import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Isa',
      email: 'admian@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
    {
      name: 'Doe',
      email: 'usertwo@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'PS5',
      category: 'Electronics',
      image: 'https://cdn.discordapp.com/attachments/755504752011378822/787317777475960853/playstation-5-digital-edition-with-dualsense-front-product-shot-01-ps5-en-30jul20.png',
      price: 499.99,
      countInStock: 13,
      rating: 4,
      numReviews: 8,
      brand: 'Sony',
      description: 'Latest sony console'
    },
    {
      name: 'PS4',
      category: 'Electronics',
      image: 'https://media.playstation.com/is/image/SCEA/playstation-4-slim-vertical-product-shot-01-us-07sep16?$native_t$',
      price: 299.99,
      countInStock: 25,
      rating: 5,
      numReviews: 12,
      brand: 'Sony',
      description: 'Sony PS4 plays games well'
    },
    {
      name: 'PS5 Controller',
      category: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/71y+UGuJl5L._AC_UY327_FMwebp_QL65_.jpg',
      price: 47.99,
      countInStock: 18,
      rating: 4,
      numReviews: 8,
      brand: 'Sony',
      description: 'PS5 latest controller'
    },
    {
      name: 'Iphone X',
      category: 'Electronics',
      image: 'https://assets.swappie.com/SwappieiPhonex256gbt%C3%A4htiharmaa-1-1-1.jpg',
      price: 999.99,
      rating: 4,
      countInStock: 13,
      numReviews: 8,
      brand: 'Apple',
      description: 'The best Iphone ever'
    },
    {
      name: 'Ipad Air',
      category: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/81FH2j7EnJL._AC_UY327_FMwebp_QL65_.jpg',
      price: 299.99,
      countInStock: 7,
      rating: 4,
      numReviews: 8,
      brand: 'Apple',
      description: 'The best tablet'
    },
    {
      name: 'Apple Watch',
      category: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/71bf9IpGjtL._AC_UY327_FMwebp_QL65_.jpg',
      price: 499.99,
      countInStock: 2,
      rating: 4,
      numReviews: 8,
      brand: 'Apple',
      description: 'The best watch'
    },
    {
      name: 'Apple Watch Series 5',
      category: 'Electronics',
      image: 'https://shop.ee.co.uk/content/dam/everything-everywhere/images/SHOP/affiliates/apple/Watch_S5_40mm_Gold+PinkBand_affilliates_800x800.png',
      price: 499.99,
      countInStock: 10,
      rating: 4,
      numReviews: 8,
      brand: 'Apple',
      description: 'The best watch'
    },
    {
      name: 'Fitbit Versa 2',
      category: 'Electronics',
      image: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/versa2/hero-static/black-carbon-aluminum/versa2-3qtr-black.png',
      price: 199.99,
      countInStock: 20,
      rating: 3.5,
      numReviews: 12,
      brand: 'Fitbit',
      description: 'The best exercise watch'
    },
    {
      name: 'Samsung Galaxy S10',
      category: 'Electronics',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61YVqHdFRxL._AC_SL1322_.jpg',
      price: 799.99,
      countInStock: 5,
      rating: 4.5,
      numReviews: 8,
      brand: 'Samsung',
      description: 'The best android phone'
    },
  ]
}

export default data;