import bookRoute from "./book.route";

const bookRoutes = {
  prefix: "/",
  routes: [
    {
      path: "books",
      route: bookRoute,
    },
  ],
};

export default bookRoutes;
