import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({ message: "Token is required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }

      // Extract user data and remove password
      const { password, ...data } = user;

      return res.status(200).json({ data });
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).json({ message: "Token verification error" });
  }
};

export default verifyToken;
