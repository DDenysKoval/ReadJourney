import { createBrowserRouter } from "react-router";

import { RouterProvider } from "react-router/dom";

import { Toaster } from "react-hot-toast";
import HomeRecommendedPage from "../pages/HomeRecommendedPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyLibraryPage from "../pages/MyLibraryPage";
import MyReadingPage from "../pages/MyReadingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRecommendedPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/library",
    element: <MyLibraryPage />,
  },
  {
    path: "/reading",
    element: <MyReadingPage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
