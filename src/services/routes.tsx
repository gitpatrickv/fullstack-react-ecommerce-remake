import ErrorPage from "../pages/ErrorPage";

import { createBrowserRouter } from "react-router";
import CartPage from "../pages/user/CartPage/CartPage";
import HomePage from "../pages/user/HomePage/HomePage";

import SellerRoute from "../components/ProtectedRoute/SellerRoute";
import UserRoute from "../components/ProtectedRoute/UserRoute";
import Layout from "../Layout/Layout";
import AccountInfoPage from "../pages/seller/AccountInfoPage/AccountInfoPage";
import CreateProductPage from "../pages/seller/CreateProductPage/CreateProductPage";
import CreateStorePage from "../pages/seller/CreateStorePage/CreateStorePage";
import MyProductsPage from "../pages/seller/MyProductsPage/MyProductsPage";
import Dashboard from "../pages/seller/SellerPage/components/Dashboard";
import SellerPage from "../pages/seller/SellerPage/SellerPage";
import AccountProfilePage from "../pages/user/AccountProfilePage/AccountProfilePage";
import AddressPage from "../pages/user/AddressPage/AddressPage";
import CheckoutPage from "../pages/user/CheckoutPage/CheckoutPage";
import MyFavoritePage from "../pages/user/MyFavoritePage/MyFavoritePage";
import MyFollowingPage from "../pages/user/MyFollowingPage/MyFollowingPage";
import AllOrders from "../pages/user/MyPurchasePage/components/AllOrders";
import CancelledOrders from "../pages/user/MyPurchasePage/components/CancelledOrders";
import CompletedOrders from "../pages/user/MyPurchasePage/components/CompletedOrders";
import ToPayOrders from "../pages/user/MyPurchasePage/components/ToPayOrders";
import ToReceiveOrders from "../pages/user/MyPurchasePage/components/ToReceiveOrders";
import ToShipOrders from "../pages/user/MyPurchasePage/components/ToShipOrders";
import MyPurchasePage from "../pages/user/MyPurchasePage/MyPurchasePage";
import ProductDetailPage from "../pages/user/ProductDetailPage/ProductDetailPage";
import StorePage from "../pages/user/StorePage/StorePage";
import UserPage from "../pages/user/UserPage/UserPage";
import RatedOrders from "../pages/user/MyPurchasePage/components/RatedOrders";

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
      { path: "/store/:storeId/:storeName", element: <StorePage /> },
      {
        path: "/cart",
        element: (
          <UserRoute>
            <CartPage />
          </UserRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <UserRoute>
            <CheckoutPage />
          </UserRoute>
        ),
      },
      {
        path: "user",
        element: (
          <UserRoute>
            <UserPage />
          </UserRoute>
        ),
        children: [
          {
            path: "account/profile",
            element: <AccountProfilePage />,
          },
          { path: "account/address", element: <AddressPage /> },
          { path: "favorites", element: <MyFavoritePage /> },
          { path: "following", element: <MyFollowingPage /> },
          {
            path: "purchase",
            element: <MyPurchasePage />,
            children: [
              { path: "order/all", element: <AllOrders /> },
              { path: "order/to-pay", element: <ToPayOrders /> },
              { path: "order/to-ship", element: <ToShipOrders /> },
              { path: "order/to-receive", element: <ToReceiveOrders /> },
              { path: "order/completed", element: <CompletedOrders /> },
              { path: "order/rated", element: <RatedOrders /> },
              { path: "order/cancelled", element: <CancelledOrders /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/seller",
    element: (
      <SellerRoute>
        <SellerPage />
      </SellerRoute>
    ),
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
