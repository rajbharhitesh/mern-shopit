import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from '../../components/layout/UserLayout';
import Meta from '../../components/layout/Meta';

const UploadAvatarPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar ? user.avatar.url : '/images/default_avatar.jpg'
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, isSuccess, error }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('avatar uploaded');
      navigate('/me/profile');
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <Meta title="Update Avatar" />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4 text-center">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="user_profile"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading' : ' Upload'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatarPage;
