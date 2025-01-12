import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './core/app/App.jsx';
import NotFound from './core/components/NotFound.jsx';
import ProtectedRoute from './core/components/ProtectedRoute.jsx';
import Providers from './core/config/Providers.jsx';
import reportWebVitals from './core/config/reportWebVitals.js';
import SignIn from './features/auth/pages/SignIn.jsx';
import SignUp from './features/auth/pages/SignUp.jsx';
import Home from './features/home/Home.jsx';
import LocationDetails from './features/locations/pages/LocationDetails.jsx';
import Locations from './features/locations/pages/Locations.jsx';
import Profile from './features/profile/pages/Profile.jsx';
import Reviews from './features/reviews/pages/Reviews.jsx';

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
        path: '/',
        element: <Home />,
      },
      {
        path: '/locations',
        element: <Locations />,
      },
      {
        path: '/locations/:id',
        element: <LocationDetails />,
      },
      {
        path: '/reviews',
        element: <Reviews />,
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]);

// Strict mode will not be removed as this will not have any effect in production
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();