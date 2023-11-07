import express from "express";
import {
  create,
  findById,
  getAll,
  login,
} from "../../controllers/user.controller";
import checkAuth from "../../middlewares/checkAuth";
import verifyToken from "../../middlewares/authenticateToken";

const authRoute = express.Router();

authRoute.get("", getAll);
authRoute.post("/create", create);
authRoute.get("/:id", verifyToken, findById);

authRoute.post("/sign-in", checkAuth, login);

export default authRoute;
