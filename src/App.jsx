/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Error from "./Components/Error/Error";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Components/Checkout/Checkout";
import MyOrders from "./Components/MyOrders/MyOrders";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Detector } from "react-detect-offline";
import Wishlist from "./Components/Wishlist/Wishlist";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import WishlistContextProvider from "./Context/WishlistContext";
function App() {
  const queryClient = new QueryClient();

  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categoryDetails/:id",
          element: (
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      {/* <Detector
        render={({ online }) => (
          <div
            className={`${
              online ? " alert-green" : " alert-error"
            } alert fixed bottom-4 right-2`}
          >
            You are currently {online ? "online" : "offline"}
          </div>
        )}
      /> */}
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={x} />
              <ReactQueryDevtools />
              <ToastContainer />
            </QueryClientProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
