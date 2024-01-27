import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app = express();

// config
dotenv.config({
  path: 'backend/config/config.env',
});

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// import routes
import productRoute from './routes/productRoute.js';

app.use('/api/v1', productRoute);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${PORT}`.bgBlue
      .black.underline.bold
  );
});
