import express from "express";

import verifyToken from "../../middlewares/authenticateToken";
import {
  create,
  deleteBook,
  findById,
  getAll,
  getBookDetailsWithRatings,
  searchBooks,
  update,
} from "../../controllers/book.controller";

const bookRoute = express.Router();

bookRoute.get("", getAll);
bookRoute.post("/create", create);
bookRoute.get("/:id", findById);
bookRoute.put("/:id", update);
bookRoute.delete("/:id", deleteBook);

bookRoute.get("/search", searchBooks);
bookRoute.get("/search/:id", getBookDetailsWithRatings);

export default bookRoute;
