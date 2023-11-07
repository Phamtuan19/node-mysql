import ratingRoute from "./rating.route";

const ratingRoutes = {
  prefix: "/",
  routes: [
    {
      path: "ratings",
      route: ratingRoute,
    },
  ],
};

export default ratingRoutes;
