import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ApiFilters from '../utils/apiFilter.js';
import { delete_file, upload_file } from '../utils/cloudinary.js';

/**-----------------------------------------------
 * @desc    Fetch All Products
 * @route   /api/v1/products
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProducts = asyncHandler(async (req, res) => {
  const resPerPage = 8;

  const apiFilters = new ApiFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({ resPerPage, filteredProductsCount, products });
});

/**-----------------------------------------------
 * @desc    Fetch Single Product
 * @route   /api/v1/products/:id
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  res.status(200).json({ product });
});

/**-----------------------------------------------
 * @desc    Get products - ADMIN
 * @route   /api/v1/admin/products
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const getAdminProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

/**-----------------------------------------------
 * @desc    New Products
 * @route   /api/v1/admin/products
 * @method  POST
 * @access  Private
 ------------------------------------------------*/
const newProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
});

/**-----------------------------------------------
 * @desc    Update Product
 * @route   /api/v1/admin/products/:id
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ product });
});

/**-----------------------------------------------
 * @desc    Delete Product
 * @route   /api/v1/admin/products/:id
 * @method  DELETE
 * @access  Private
 ------------------------------------------------*/
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  // Deleting image associated with product
  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({ message: 'Product deleted' });
});

/**-----------------------------------------------
 * @desc    Create/Update Product review
 * @route   /api/v1/reviews
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const createReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

/**-----------------------------------------------
 * @desc     Get product reviews 
 * @route   /api/v1/reviews
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('reviews.user');

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({ reviews: product.reviews });
});

/**-----------------------------------------------
 * @desc     Delete product review
 * @route   /api/v1/reviews
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const deleteReview = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

/**-----------------------------------------------
 * @desc    upload Product Images
 * @route   /api/v1/admin/products/:id/upload_images
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const uploadProductImages = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const uploader = async (image) => upload_file(image, 'shopit/products');

  const urls = await Promise.all(req.body.images.map(uploader));

  product.images.push(...urls);
  await product.save();

  res.status(200).json({
    product,
  });
});

/**-----------------------------------------------
 * @desc    Delete Product Images
 * @route   /api/v1/admin/products/:id/delete_image
 * @method  DELETE
 * @access  Private
 ------------------------------------------------*/
const deleteProductImage = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const isDeleted = await delete_file(req.body.imgId);

  if (isDeleted) {
    product.images = product?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );

    await product?.save();
  }

  res.status(200).json({
    product,
  });
});

export {
  getProducts,
  getAdminProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createReview,
  getProductReviews,
  deleteReview,
  uploadProductImages,
  deleteProductImage,
};
