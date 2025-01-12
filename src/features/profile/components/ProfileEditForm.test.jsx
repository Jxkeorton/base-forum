import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { renderWithProviders } from '../../../test/setup/testUtils';

import ProfileEditForm from './ProfileEditForm';

describe('ProfileEditForm component', () => {
  const mockCloseModal = vi.fn();

  test('renders form elements correctly', () => {
    renderWithProviders(
      <ProfileEditForm 
        username="testUser" 
        noOfBaseJumps="5" 
        closeModal={mockCloseModal}
        src="test-image.jpg"
      />,
    );

    // Check for form elements
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/base jumps/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/change image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('displays initial profile data', () => {
    renderWithProviders(
      <ProfileEditForm 
        username="testUser" 
        noOfBaseJumps="5" 
        closeModal={mockCloseModal}
        src="test-image.jpg"
      />,
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('testUser');
    expect(screen.getByLabelText(/base jumps/i)).toHaveValue(5);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
  });

  test('handles form input changes', () => {
    renderWithProviders(
      <ProfileEditForm 
        username="testUser" 
        noOfBaseJumps="5" 
        closeModal={mockCloseModal}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i);
    const baseJumpsInput = screen.getByLabelText(/base jumps/i);

    fireEvent.change(nameInput, { target: { name: 'name', value: 'newUser' } });
    fireEvent.change(baseJumpsInput, { target: { name: 'no_of_base_jumps', value: '10' } });

    expect(nameInput).toHaveValue('newUser');
    expect(baseJumpsInput).toHaveValue(10);
  });

  test('closes modal on cancel', () => {
    renderWithProviders(
      <ProfileEditForm 
        username="testUser" 
        noOfBaseJumps="5" 
        closeModal={mockCloseModal}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});