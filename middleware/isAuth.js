import jwt from "jsonwebtoken";

const isAuth = async ({ req }) => {
  let isAuth = true;
  let userId = null;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    isAuth = false;
    return { isAuth, userId };
  }
  const token = authHeader.split(" ")[1]; // bearer token
  if (!token || token === " ") {
    isAuth = false;
    return { isAuth, userId };
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    isAuth = false;
    return { isAuth, userId };
  }
  if (!decodedToken) {
    req.isAuth = false;
    return { isAuth, userId };
  }

  isAuth = true;
  userId = decodedToken.userId;
  return { isAuth, userId };
};

export default isAuth;
