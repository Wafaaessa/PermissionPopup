import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App component', () => {
  it('renders live session when permissions are granted', async () => {
    const mockMediaDevices = {
      getUserMedia: jest.fn(() => Promise.resolve())
    };
    Object.defineProperty(navigator, 'mediaDevices', {
      value: mockMediaDevices,
      writable: true
    });

    const { getByText, queryByText } = render(<App />);

    expect(getByText('Live Session')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Welcome to the live session!')).toBeInTheDocument();
    });

    fireEvent.click(getByText('End Live'));

    await waitFor(() => {
      expect(queryByText('Welcome to the live session!')).not.toBeInTheDocument();
      expect(getByText('Live session ended')).toBeInTheDocument();
    });
  });

  it('renders popup when permissions are not granted', async () => {
    const mockMediaDevices = {
      getUserMedia: jest.fn(() => Promise.reject(new Error('Permission denied')))
    };
    Object.defineProperty(navigator, 'mediaDevices', {
      value: mockMediaDevices,
      writable: true
    });

    const { getByText } = render(<App />);

    expect(getByText('Live Session')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(/StorkyApp is blocked from using your camera or microphone./i)).toBeInTheDocument();
    });
  });
});
