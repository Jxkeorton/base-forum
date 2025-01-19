import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';

import { loggedOutHandler } from '../../../test/mocks/handlers';
import { server } from '../../../test/mocks/server';
import { clearAuthToken, renderWithProviders } from '../../../test/setup/testUtils';

import NavBar from './Navbar';

describe('NavBar', () => {
  beforeEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });

  test('renders logo and brand text', async () => {
    await renderWithProviders(<NavBar />, { authenticated: false });
    expect(screen.getByText('Base Forum')).toBeInTheDocument();
  });

  test('renders logged in state correctly', async () => {
    await renderWithProviders(<NavBar />, { authenticated: true });

    // Test that all authenticated elements are present
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();

    // Check for both mobile and desktop Add Review buttons
    const addReviewButtons = screen.getAllByText('Add Review');
    expect(addReviewButtons).toHaveLength(2);
    
    // Check non-authenticated elements are not present
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('renders logged out state correctly', async () => {
    clearAuthToken();
    server.use(loggedOutHandler);
    
    await renderWithProviders(<NavBar />, { authenticated: false });

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    // Check authenticated elements are not present
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    expect(screen.queryByText('Add Review')).not.toBeInTheDocument();
  });

  test('handles sign out process correctly', async () => {
    await renderWithProviders(<NavBar />, { authenticated: true });

    // Wait for Sign Out link and click it
    const signOutLink = screen.getByText('Sign Out');
    fireEvent.click(signOutLink);

    // Verify confirmation modal appears
    expect(screen.getByText('Confirm Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to sign out?')).toBeInTheDocument();

    // Click confirm button
    const confirmButton = screen.getByTestId('confirmation-button');
    fireEvent.click(confirmButton);

    // Wait for sign out to complete
    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    // Verify authenticated elements are removed
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    expect(screen.queryByText('Add Review')).not.toBeInTheDocument();
  });
});