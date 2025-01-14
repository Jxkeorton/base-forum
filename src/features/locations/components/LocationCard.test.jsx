import { fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi} from 'vitest';

import { renderWithProviders } from '../../../test/setup/testUtils.jsx';

import LocationCard from './LocationCard.jsx';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LocationCard', () => {

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const location = {
    id: 10,
    name: 'La Tête de Chien',
    country: 'France',
    longitude: '7.403012',
    latitude: '43.731660',
    rock_drop: 328,
    total_height: 400,
    access:
      '0 minutes with shuttle: Park at the Tête de Chien panorama car park. The fairly obvious exit is only accessible from the fort which is unfortunately not accessible to the public... First locate the exit from the panorama.',
    cliff_aspect: 'SE',
    opened_by: 'Gillian Hamcy , David Degrado',
    date_opened: '2018-12-30',
    image:
      'https://res.cloudinary.com/dz02qubd3/image/upload/v1733696696/Untitled_design_15_upirhl.png',
  };
  test('renders the card with location data', () => {
    renderWithProviders(<LocationCard location={location} />);

    expect(screen.getByText(location.name)).toBeInTheDocument();
    expect(screen.getByText(`${location.rock_drop} Feet`)).toBeInTheDocument();
    expect(
      screen.getByText(`${location.total_height} Feet`),
    ).toBeInTheDocument();
    expect(screen.getByText(location.opened_by)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('More info button navigates to correct url', () => {
    renderWithProviders(<LocationCard location={location} />);
    
    const button = screen.getByRole('button', { name: /more info/i });
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/locations/${location.id}`);
  });
});