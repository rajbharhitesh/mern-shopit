import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import { clearCart } from '../../redux/feature/cartSlice';
import Meta from '../../components/layout/Meta';
import Loader from '../../components/layout/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get('order_success');

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate('/me/orders');
    }
  }, [error, orderSuccess, dispatch, navigate]);

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Payment Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Order Status',
          field: 'orderStatus',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `$${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link to={`/me/order/${order?._id}`} className="btn btn-primary ">
              <i className="fa fa-eye"></i>
            </Link>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={'My Orders'} />
      <h1 className="my-5">{data?.orders?.length} Orders</h1>
      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </>
  );
};

export default OrderPage;
