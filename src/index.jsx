import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Locations from "./pages/locations/Locations.jsx";
import LocationDetails from "./pages/locations/LocationDetails.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Reviews from "./pages/reviews/Reviews.jsx";
import Profile from "./pages/profile/Profile.jsx";

import Providers from "./Providers.jsx";

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

// Strict mode will not be removed as this will not have any effect in production
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();