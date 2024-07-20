import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CameraMicAccessPopup from './CameraMicAccessPopup';


describe('CameraMicAccessPopup', () => {
  const mockOnRequestClose = jest.fn();

  it('renders correctly when open', () => {
    render(
      <CameraMicAccessPopup
        isOpen={true}
        onRequestClose={mockOnRequestClose}
      />
    );

    expect(screen.getByText('Mic and Camera Access')).toBeInTheDocument();
    expect(screen.getByAltText('Mic and Camera Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Page Info Icon')).toBeInTheDocument();
    expect(screen.getByText('StorkyApp is blocked from using your camera or microphone.')).toBeInTheDocument();
  });

  it('calls onRequestClose when Close button is clicked', () => {
    render(
      <CameraMicAccessPopup
        isOpen={true}
        onRequestClose={mockOnRequestClose}
      />
    );

    fireEvent.click(screen.getByText('Close'));
    expect(mockOnRequestClose).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    render(
      <CameraMicAccessPopup
        isOpen={false}
        onRequestClose={mockOnRequestClose}
      />
    );

    expect(screen.queryByText('Mic and Camera Access')).not.toBeInTheDocument();
  });
});
