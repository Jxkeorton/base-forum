import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { test } from 'vitest'
import NavBar from '../ui/navbar/Navbar.jsx';

test('renders NavBar', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <NavBar />
    }
  ]);

  render(
    <RouterProvider router={router} />
  );

  screen.debug();
});