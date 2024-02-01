import Loader from '../components/layout/Loader';
import Meta from '../components/layout/Meta';
import ProductItem from '../components/product/ProductItem';
import { useGetProductsQuery } from '../redux/api/productApi';

const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={'Buy Best Products'} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1
            id="products_heading"
            className="text-secondary text-center"
            style={{
              textDecoration: 'underline',
            }}
          >
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
