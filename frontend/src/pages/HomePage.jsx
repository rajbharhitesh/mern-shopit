import { useEffect } from 'react';
import { useGetProductsQuery } from '../redux/api/productApi';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/layout/Loader';
import Meta from '../components/layout/Meta';
import ProductItem from '../components/product/ProductItem';
import CustomPagination from '../components/layout/CustomPagination';
import Filter from '../components/layout/Filter';

const HomePage = () => {
  let [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword') || '';
  const max = searchParams.get('max');
  const min = searchParams.get('min');
  const category = searchParams.get('category');
  const ratings = searchParams.get('ratings');

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={'Buy Best Products'} />
      <div className="row">
        {keyword && (
          <div className="col-6  col-md-3 mt-5">
            <Filter />
          </div>
        )}

        <div className={keyword ? 'col-6 col-md-9' : 'col-6 col-md-12'}>
          <h1
            id="products_heading"
            className="text-secondary text-center"
            style={{
              textDecoration: 'underline',
            }}
          >
            {keyword
              ? `${data.products.length} products found with keyword: ${keyword}`
              : 'Latest Products'}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products.map((product) => (
                <ProductItem
                  product={product}
                  key={product._id}
                  columnSize={columnSize}
                />
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
