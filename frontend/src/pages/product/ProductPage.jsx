import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetProductQuery } from '../../redux/api/productApi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import Loader from '../../components/layout/Loader';
import { setCartItem } from '../../redux/feature/cartSlice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data, isError, isLoading, error } = useGetProductQuery(id);
  const product = data?.product;

  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  useEffect(() => {
    setActiveImage(
      product?.images[0]
        ? product?.images[0].url
        : '/images/default_product.png'
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const setItemToCart = () => {
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));

    toast.success('item added to cart');
    navigate('/cart');
  };

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImage}
            alt={product.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images.map((img) => (
            <div key={img.url} className="col-2 ms-4 mt-2">
              <a href="#button" role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImage ? 'border-warning' : ''
                  }`}
                  height="100"
                  width="100"
                  src={img.url}
                  alt={img.url}
                  onClick={() => setActiveImage(img.url)}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product.name}</h3>
        <p id="product_id">Product # {product._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="22px"
            starSpacing="0.5px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            {' '}
            ({product.numOfReviews} Reviews){' '}
          </span>
        </div>
        <hr />

        <p id="product_price">${product.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQty}>
            -
          </span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <span className="btn btn-primary plus" onClick={increaseQty}>
            +
          </span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product.stock === 0}
          onClick={setItemToCart}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{' '}
          <span
            id="stock_status"
            className={product.stock > 0 ? 'greenColor' : 'redColor'}
          >
            {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
