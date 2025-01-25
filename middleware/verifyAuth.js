import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  const token = req.cookies.authToken;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error in verifyAuth middleware: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
