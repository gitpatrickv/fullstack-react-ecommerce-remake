import ErrorPage from "../pages/ErrorPage";

import { createBrowserRouter } from "react-router";
import CartPage from "../pages/user/CartPage/CartPage";
import HomePage from "../pages/user/HomePage/HomePage";

import UserRoute from "../components/ProtectedRoute/UserRoute";
import Layout from "../Layout/Layout";
import CreateStorePage from "../pages/seller/CreateStorePage/CreateStorePage";
import SellerPage from "../pages/seller/SellerPage/SellerPage";
import ProductDetailPage from "../pages/user/ProductDetailPage/ProductDetailPage";

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
      { path: `/product/:productId`, element: <ProductDetailPage /> },
      {
        path: "/cart",
        element: (
          <UserRoute>
            <CartPage />
          </UserRoute>
        ),
      },
    ],
  },

  {
    path: "/seller/:storeName",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SellerPage />,
      },
    ],
  },

  {
    path: "/create/store",
    element: (
      <UserRoute>
        <CreateStorePage />
      </UserRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
