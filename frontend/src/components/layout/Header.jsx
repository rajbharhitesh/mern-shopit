import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/api/authApi';

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" method="get">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <span id="cart" className="ms-3">
            {' '}
            Cart{' '}
          </span>
          <span className="ms-1" id="cart_count">
            0
          </span>
        </Link>

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user.avatar ? user.avatar.url : '/images/default_avatar.jpg'
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              <Link className="dropdown-item" to="/admin/dashboard">
                {' '}
                Dashboard{' '}
              </Link>

              <Link className="dropdown-item" to="/me/orders">
                {' '}
                Orders{' '}
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {' '}
                Profile{' '}
              </Link>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
                {' '}
                Logout{' '}
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              {' '}
              Login{' '}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
