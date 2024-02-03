import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from '../../components/layout/UserLayout';

const UpdateProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('user updated');
      navigate('/me/profile');
    }
  }, [error, isSuccess, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name, email };

    updateProfile(userData);
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2
              className="mb-4 text-center"
              style={{
                textDecoration: 'underline',
              }}
            >
              Update Profile
            </h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {' '}
                Name{' '}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                {' '}
                Email{' '}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Updating' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfilePage;
