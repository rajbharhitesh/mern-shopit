import Product from '../models/productModel.js';

/**-----------------------------------------------
 * @desc    Fetch All Products
 * @route   /api/v1/products
 * @method  GET
 * @access  Public
 ------------------------------------------------*/
const getProducts = async (req, res) => {
  res.status(200).json({
    message: 'All Products',
  });
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

export { getProducts, newProduct };
