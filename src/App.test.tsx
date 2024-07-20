import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App', () => {
  beforeAll(() => {
  
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: jest.fn(),
      },
      configurable: true, 
    });
  });

  it('renders the welcome message when permissions are granted', async () => {
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue(true);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Welcome to the live session!')).toBeInTheDocument();
    });
  });

  it('renders the CameraMicAccessPopup when permissions are denied', async () => {
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(new Error('Permission denied'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Mic and Camera Access')).toBeInTheDocument();
    });
  });
});
