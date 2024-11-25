import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Locations from "./pages/locations/Locations";
import LocationDetails from "./pages/locations/LocationDetails";
import NotFound from "./pages/notfound/NotFound";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Reviews from "./pages/reviews/Reviews";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { SavedLocationsProvider } from "./contexts/SavedLocationsContext";
import { ModalProvider } from "./contexts/ReviewModalContext";
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: <Profile />,
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
    <CurrentUserProvider>
      <ProfileProvider>
        <SavedLocationsProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </SavedLocationsProvider>
      </ProfileProvider>
    </CurrentUserProvider>
  </React.StrictMode>
);

reportWebVitals();
