import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ProtectedRoute from "./components/ProtectedRoute";

import Locations from "./pages/locations/Locations";
import LocationDetails from "./pages/locations/LocationDetails";
import NotFound from "./pages/notfound/NotFound";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Reviews from "./pages/reviews/Reviews";
import Profile from "./pages/profile/Profile";

import Providers from "./Providers";

const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Locations />,
      },
      {
        path: "/locations/:id",
        element: <LocationDetails />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();