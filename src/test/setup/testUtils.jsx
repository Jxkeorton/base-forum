import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Providers from '../../core/config/Providers';

export const renderWithProviders = (ui, { route = '/' } = {}) => {
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Providers>
          {ui}
        </Providers>
      </MemoryRouter>,
    ),
  };
};