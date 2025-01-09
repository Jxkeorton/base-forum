import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Providers from '../../Providers';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...await vi.importActual('react-router-dom'),
  useNavigate: () => navigate,
}));

export const renderWithProviders = (ui, { route = '/' } = {}) => {
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Providers>
          {ui}
        </Providers>
      </MemoryRouter>,
    ),
    navigate,
  };
};