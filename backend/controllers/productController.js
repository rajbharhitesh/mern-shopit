import Product from '../models/productModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

/**-----------------------------------------------
 * @desc    Fetch All Products
 * @route   /api/v1/products
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ products });
};

/**-----------------------------------------------
 * @desc    Fetch Single Product
 * @route   /api/v1/products/:id
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  res.status(200).json({ product });
};

/**-----------------------------------------------
 * @desc    New Products
 * @route   /api/v1/admin/products
 * @method  POST
 * @access  Private
 ------------------------------------------------*/
const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
};

/**-----------------------------------------------
 * @desc    Update Product
 * @route   /api/v1/admin/products/:id
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ product });
};

/**-----------------------------------------------
 * @desc    Delete Product
 * @route   /api/v1/admin/products/:id
 * @method  DELETE
 * @access  Private
 ------------------------------------------------*/
const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }

  await product.deleteOne();

  res.status(200).json({ message: 'Product deleted' });
};

export {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
