// create token and save in cookie
const sendToken = (user, statusCode, res) => {
  // create jwt token
  const token = user.getJwtToken();

  // option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookies('token', token, options).json({ token });
};

export default sendToken;
