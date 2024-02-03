import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/config/config.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      (res) => {
        resolve({
          public_id: res.public_id,
          url: res.url,
        });
      },
      { resource_type: 'auto', folder }
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);

  if (res.result === 'ok') return true;
};
