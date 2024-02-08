import path from 'path';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error:${err}`);
  console.log(`shutting down the server due to uncaught exception`);
  process.exit(1);
});

// config
dotenv.config({
  path: 'backend/config/config.env',
});

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// import routes
import productRoute from './routes/productRoute.js';
import authRoute from './routes/authRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';

app.use(cookieParser());
app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', productRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// error middlewares
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${PORT}`.bgBlue
      .black.underline.bold
  );
});

// handle unhandle promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err}`);
  console.log(`shutting down the server due to unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
