import express from "express";
import { create } from "../../controllers/rating.model";

const ratingRoute = express.Router();

ratingRoute.post("/create", create);

export default ratingRoute;
