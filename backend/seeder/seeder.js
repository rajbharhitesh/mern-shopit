import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../config/db.js';
import products from './data.js';
import Product from '../models/productModel.js';

dotenv.config({
  path: 'backend/config/config.env',
});

connectDB();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    console.log('Products deleted'.red.underline);

    await Product.insertMany(products);
    console.log('Products added'.blue.underline);

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seedProducts();
