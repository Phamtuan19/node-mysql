import userRoutes from "./user";
import bookRoutes from "./book";
import ratingRoutes from "./rating";

export const routes = [
  { ...userRoutes },
  { ...bookRoutes },
  { ...ratingRoutes },
];
