import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ApiFilters from '../utils/apiFilter.js';

/**-----------------------------------------------
 * @desc    Fetch All Products
 * @route   /api/v1/products
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProducts = asyncHandler(async (req, res) => {
  const apiFilters = new ApiFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProducts = products.length;

  res.status(200).json({ filteredProducts, products });
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
 * @desc    New Products
 * @route   /api/v1/admin/products
 * @method  POST
 * @access  Private
 ------------------------------------------------*/
const newProduct = asyncHandler(async (req, res) => {
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

  await product.deleteOne();

  res.status(200).json({ message: 'Product deleted' });
});

export {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
