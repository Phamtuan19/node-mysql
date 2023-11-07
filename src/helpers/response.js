import { STATUS } from "../config/status";

export class ErrorHandler extends Error {
  status;
  error;
  constructor(status, error) {
    super();
    this.status = status;
    this.error = error;
  }
}

export const responseError = (res, error) => {
  if (error instanceof ErrorHandler) {

    const status = error.status;
    if (typeof error.error === "string") {
      const message = error.error;
      return res.status(status).send({ message, data: null });
    }

    return res.status(status).send({
      message: "lỗi",
      data: null,
    });
  }
  return res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: error.message, data: null });
};

export const responseSuccess = (res, data) => {
  return res.status(STATUS.OK).send(data);
};
