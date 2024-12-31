import ErrorPage from "../pages/ErrorPage";

import { createBrowserRouter } from "react-router";
import CartPage from "../pages/user/CartPage/CartPage";
import HomePage from "../pages/user/HomePage/HomePage";

import UserRoute from "../components/ProtectedRoute/UserRoute";
import Layout from "../Layout/Layout";
import AccountInfoPage from "../pages/seller/AccountInfoPage/AccountInfoPage";
import CreateProductPage from "../pages/seller/CreateProductPage/CreateProductPage";
import CreateStorePage from "../pages/seller/CreateStorePage/CreateStorePage";
import MyProductsPage from "../pages/seller/MyProductsPage/MyProductsPage";
import Dashboard from "../pages/seller/SellerPage/Dashboard";
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
      {
        path: `/product/:productId/:slug`,
        element: <ProductDetailPage />,
      },
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
    path: "/seller",
    element: <SellerPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <MyProductsPage />,
      },
      {
        path: "product/create",
        element: <CreateProductPage />,
      },
      {
        path: "account/info",
        element: <AccountInfoPage />,
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
