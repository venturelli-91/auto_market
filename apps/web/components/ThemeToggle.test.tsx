import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

const mockToggleTheme = jest.fn();

jest.mock('../app/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

import { useTheme } from '../app/ThemeContext';

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a button', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows Sun icon in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark', toggleTheme: mockToggleTheme });
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows Moon icon in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has correct aria-label for accessibility', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
