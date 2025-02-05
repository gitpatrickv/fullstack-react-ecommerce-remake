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
import AllCustomerOrders from "../pages/seller/OrderPage/components/AllCustomerOrders";
import CancelledCustomerOrders from "../pages/seller/OrderPage/components/CancelledCustomerOrders";
import CompletedCustomerOrders from "../pages/seller/OrderPage/components/CompletedCustomerOrders";
import RatedCustomerOrders from "../pages/seller/OrderPage/components/RatedCustomerOrders";
import ShippingCustomerOrders from "../pages/seller/OrderPage/components/ShippingCustomerOrders";
import ToShipCustomerOrders from "../pages/seller/OrderPage/components/ToShipCustomerOrders";
import UnpaidCustomerOrders from "../pages/seller/OrderPage/components/UnpaidCustomerOrders";
import OrderPage from "../pages/seller/OrderPage/OrderPage";
import ReviewManagementPage from "../pages/seller/ReviewManagementPage/ReviewManagementPage";
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
import RatedOrders from "../pages/user/MyPurchasePage/components/RatedOrders";
import ToPayOrders from "../pages/user/MyPurchasePage/components/ToPayOrders";
import ToReceiveOrders from "../pages/user/MyPurchasePage/components/ToReceiveOrders";
import ToShipOrders from "../pages/user/MyPurchasePage/components/ToShipOrders";
import MyPurchasePage from "../pages/user/MyPurchasePage/MyPurchasePage";
import ProductCategoryPage from "../pages/user/ProductCategoryPage/ProductCategoryPage";
import ProductDetailPage from "../pages/user/ProductDetailPage/ProductDetailPage";
import SearchPage from "../pages/user/SearchPage/SearchPage";
import StorePage from "../pages/user/StorePage/StorePage";
import UserPage from "../pages/user/UserPage/UserPage";

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
      { path: "/search", element: <SearchPage /> },
      {
        path: "/category/:category",
        element: <ProductCategoryPage />,
      },
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
      {
        path: "customer/service/review",
        element: <ReviewManagementPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
        children: [
          { path: "all", element: <AllCustomerOrders /> },
          { path: "unpaid", element: <UnpaidCustomerOrders /> },
          { path: "to-ship", element: <ToShipCustomerOrders /> },
          { path: "shipping", element: <ShippingCustomerOrders /> },
          { path: "completed", element: <CompletedCustomerOrders /> },
          { path: "rated", element: <RatedCustomerOrders /> },
          { path: "cancelled", element: <CancelledCustomerOrders /> },
        ],
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
