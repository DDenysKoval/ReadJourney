import { createBrowserRouter } from "react-router";

import { RouterProvider } from "react-router/dom";

import { Toaster } from "react-hot-toast";
import RecommendedPage from "../pages/RecommendedPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyLibraryPage from "../pages/MyLibraryPage";
import MyReadingPage from "../pages/MyReadingPage";
import { useEffect } from "react";
import { useAuthStore } from "../libs/store/authStore";
import { refreshApi } from "../services/userServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecommendedPage />,
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

// const useAuthInit = () => {
//   const { refreshToken, setAuth, clearAuth } = useAuthStore();

//   useEffect(() => {
//     const initAuth = async () => {
//       if (!refreshToken) return;

//       try {
//         const { data } = await refreshApi.get("/users/current/refresh", {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         });
//         console.log(data);

//         setAuth(data);
//       } catch {
//         clearAuth();
//       }
//     };

//     initAuth();
//   }, []);
// };

const App = () => {
  // useAuthInit();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
