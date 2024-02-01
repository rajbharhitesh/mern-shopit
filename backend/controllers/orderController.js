import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

/**-----------------------------------------------
 * @desc    Create new Order
 * @route   /api/v1/orders/new
 * @method  POST
 * @access  Private
 ------------------------------------------------*/
const newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

/**-----------------------------------------------
 * @desc    Get current user orders
 * @route   /api/v1/me/orders
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

/**-----------------------------------------------
 * @desc    Get order details
 * @route   /api/v1/orders/:id
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const getOrderDetails = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  res.status(200).json({
    order,
  });
});

/**-----------------------------------------------
 * @desc     Get all orders - ADMIN 
 * @route   /api/v1/admin/orders
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const allOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

/**-----------------------------------------------
 * @desc     Update Order - ADMIN 
 * @route   /api/v1/admin/orders/:id
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  let productNotFound = false;

  // Update products stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product.toString());
    if (!product) {
      productNotFound = true;
      break;
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  if (productNotFound) {
    return next(
      new ErrorHandler('No Product found with one or more IDs.', 404)
    );
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

/**-----------------------------------------------
 * @desc     Delete Order - ADMIN 
 * @route   /api/v1/admin/orders/:id
 * @method  DELETE
 * @access  Private
 ------------------------------------------------*/
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

export {
  newOrder,
  myOrders,
  getOrderDetails,
  allOrders,
  updateOrder,
  deleteOrder,
};
