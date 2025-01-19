import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Providers from '../../core/config/Providers';

export const setupAuthToken = () => {
  const futureTime = Math.floor(Date.now() / 1000) + 3600;
  localStorage.setItem('refreshTokenTimestamp', futureTime.toString());
};

export const clearAuthToken = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};

export const renderWithProviders = async (ui, { route = '/', authenticated = true } = {}) => {
  // Clear any existing state
  localStorage.clear();
  
  if (authenticated) {
    setupAuthToken();
  }
  
  const utils = render(
    <MemoryRouter initialEntries={[route]}>
      <Providers>
        {ui}
      </Providers>
    </MemoryRouter>
  );

  // Wait for initial loading state to complete
  if (authenticated) {
    await waitFor(() => {
      const signInButton = utils.queryByText('Sign In');
      const signOutButton = utils.queryByText('Sign Out');
      if (!signOutButton && signInButton) {
        throw new Error('Authentication failed to initialize');
      }
    }, { timeout: 4000 });
  }

  return utils;
};