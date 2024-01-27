import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter Product name'],
      maxLength: [200, 'Product name cannot exceed 200 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Please enter Product price'],
      maxLength: [5, 'Product price cannot exceed 5 digits'],
    },

    description: {
      type: String,
      required: [true, 'Please enter Product description'],
    },

    seller: {
      type: String,
      required: [true, 'Please enter Product seller'],
    },

    category: {
      type: String,
      required: [true, 'Please enter Product category'],
      enum: {
        values: [
          'Electronics',
          'Cameras',
          'Laptops',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Sports',
          'Outdoor',
          'Home',
        ],

        message: 'Please select correct category',
      },
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: [true, 'Please enter Product stock'],
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
