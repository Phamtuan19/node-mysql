import ratingModel from "../models/rating.model";

export const create = async (req, res) => {
  try {
    const data = req.body;

    data.created_at = new Date();
    data.updated_at = new Date();

    return await ratingModel.create(res, data);
  } catch (error) {
    return responseError(res, error);
  }
};
