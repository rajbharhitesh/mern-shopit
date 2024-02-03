import { useEffect } from 'react';
import { useGetProductsQuery } from '../redux/api/productApi';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/layout/Loader';
import Meta from '../components/layout/Meta';
import ProductItem from '../components/product/ProductItem';
import CustomPagination from '../components/layout/CustomPagination';

const HomePage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const params = { page };

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

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

          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
