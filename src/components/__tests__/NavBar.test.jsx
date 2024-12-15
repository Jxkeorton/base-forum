import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { loggedOutHandler } from '../../mocks/handlers.js';
import { server } from '../../mocks/server.js';
import Providers from '../../Providers.jsx';
import NavBar from '../ui/navbar/Navbar.jsx';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Providers>
        {ui}
      </Providers>
    </MemoryRouter>
  )
}

describe('NavBar', () => {
  test('renders logged in state when user is authenticated', async () => {
    renderWithProviders(<NavBar />)

    await waitFor(() => {
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    expect(screen.getByText('Add Review')).toBeInTheDocument()
    expect(screen.getByText('Locations')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument()
  })

  test('renders logged out state when user is not authenticated', async () => {
    server.use(loggedOutHandler)

    renderWithProviders(<NavBar />)

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument()
    })

    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('Locations')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
    expect(screen.queryByText('Add Review')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })
})