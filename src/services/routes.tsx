import ErrorPage from "../pages/ErrorPage";

import HomePage from "../pages/user/HomePage/HomePage";
import { createBrowserRouter } from "react-router";
import CartPage from "../pages/user/CartPage/CartPage";
import SellerPage from "../pages/seller/SellerPage";
import Layout from "../Layout/user/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },

  {
    path: "/seller",
    element: <SellerPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
