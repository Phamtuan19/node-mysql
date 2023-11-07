import jwt from "jsonwebtoken";
import usersModel from "../models/users.model";
import { responseSuccess } from "../helpers/response";

const checkAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await usersModel.findOne(res, "email", email);

    if (!existUser) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    if (!usersModel.authenticate(password, existUser.password)) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    const token = jwt.sign({ ...existUser }, process.env.SECRETKEY, {});
    const { password: userPassword, ...user } = existUser;

    const data = {
      message: "Đăng nhập thành công.",
      data: {
        token: token,
        data: user,
      },
    };

    responseSuccess(res, data);
  } catch (error) {
    res.status(400).json({ message: "Login faileds", error });
  }

  next();
};

export default checkAuth;
