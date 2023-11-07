import { responseError, responseSuccess } from "../helpers/response";
import bookModel from "../models/book.model";
import ratingModel from "../models/rating.model";

// [POST] Tạo mới một cuốn sách
export const create = async (req, res) => {
  try {
    const data = req.body;
    return await bookModel.create(res, data);
  } catch (error) {
    return responseError(res, error);
  }
};

// [GET] Lấy danh sách tất cả các cuốn sách
export const getAll = async (req, res) => {
  try {
    return await bookModel.read(res);
  } catch (error) {
    return responseError(res, error);
  }
};

// Lấy thông tin một cuốn sách dựa trên ID
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findOne(res, "id", id);

    const data = {
      message: "Lấy dữ thành công",
      data: book,
    };

    return responseSuccess(res, data);
  } catch (error) {
    return responseError(res, error);
  }
};

// [PUT]
export const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedBook = await bookModel.update("id", id, data);
    return responseSuccess(res, updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi trong quá trình cập nhật dữ liệu", error });
  }
};

// [DELETE]
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    return await bookModel.delete(res, id);
  } catch (error) {
    return responseError(res, error);
  }
};

/**
 *
 * common client
 *
 */

// [GET]
export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
      return responseError(res, {
        message: "Vui lòng nhập số ISBN, tiêu đề, hoặc tác giả.",
      });
    }

    const searchResults = await bookModel.searchBooks(searchTerm);

    if (searchResults.length > 0) {
      return responseSuccess(res, searchResults);
    } else {
      return responseError(res, { message: "Không tìm thấy kết quả phù hợp." });
    }
  } catch (error) {
    return responseError(res, error);
  }
};

export const getBookDetailsWithRatings = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseError(res, {
        message: "Vui lòng cung cấp ID của cuốn sách.",
      });
    }

    const bookDetails = await bookModel.findOne(res, "id", id);

    const ratings = await ratingModel.findRatingsByBookId(id);

    const bookWithRatings = {
      book: bookDetails,
      ratings: ratings,
    };

    return responseSuccess(res, bookWithRatings);
  } catch (error) {
    return responseError(res, error);
  }
};
