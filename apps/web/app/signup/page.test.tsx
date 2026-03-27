import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from './page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../../components/ThemeToggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme" />,
}));

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: new Proxy(
    {},
    {
      get:
        (_t, prop) =>
        ({ children, initial, animate, transition, whileInView, exit, whileHover, ...rest }: any) =>
          React.createElement(String(prop), rest, children),
    }
  ),
  useReducedMotion: jest.fn(() => false),
  AnimatePresence: ({ children }: any) => children,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fillValidForm(overrides: Partial<{
  name: string; email: string; password: string; confirm: string;
}> = {}) {
  const {
    name = 'John Smith',
    email = 'john@test.com',
    password = 'password123',
    confirm = 'password123',
  } = overrides;

  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: confirm } });
  fireEvent.click(screen.getByRole('checkbox'));
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeAll(() => {
  Object.defineProperty(window, 'location', { writable: true, value: { href: '' } });
});

beforeEach(() => {
  window.location.href = '';
  localStorage.clear();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SignupPage', () => {
  describe('Initial rendering', () => {
    it('renders the "Create Account" heading', () => {
      render(<SignupPage />);
      expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    });

    it('renders the Full Name input', () => {
      render(<SignupPage />);
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    });

    it('renders the Email input', () => {
      render(<SignupPage />);
      expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    });

    it('renders the Password input as type="password" by default', () => {
      render(<SignupPage />);
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    });

    it('renders the Confirm Password input as type="password" by default', () => {
      render(<SignupPage />);
      expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'password');
    });

    it('renders the terms checkbox unchecked by default', () => {
      render(<SignupPage />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders the "Create Account" submit button', () => {
      render(<SignupPage />);
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('renders Google and Apple social login buttons', () => {
      render(<SignupPage />);
      expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument();
    });

    it('renders a "Sign in" link pointing to "/login"', () => {
      render(<SignupPage />);
      expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
    });

    it('does not render an error alert initially', () => {
      render(<SignupPage />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Password visibility toggles', () => {
    it('password field changes to type="text" when show-password is clicked', () => {
      render(<SignupPage />);
      fireEvent.click(screen.getAllByLabelText(/show password/i)[0]);
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'text');
    });

    it('password field reverts to type="password" when toggled again', () => {
      render(<SignupPage />);
      fireEvent.click(screen.getAllByLabelText(/show password/i)[0]);
      fireEvent.click(screen.getAllByLabelText(/hide password/i)[0]);
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    });

    it('aria-label changes to "Hide password" when password is visible', () => {
      render(<SignupPage />);
      const toggles = screen.getAllByLabelText(/show password/i);
      fireEvent.click(toggles[0]);
      expect(screen.getAllByLabelText(/hide password/i)).toHaveLength(1);
    });

    it('confirm password has an independent toggle', () => {
      render(<SignupPage />);
      const toggles = screen.getAllByLabelText(/show password/i);
      fireEvent.click(toggles[1]); // second toggle = confirm password
      expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    });
  });

  describe('Validation — password mismatch', () => {
    it('shows "Passwords do not match." when passwords differ', async () => {
      render(<SignupPage />);
      fillValidForm({ confirm: 'different123' });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/passwords do not match/i);
    });

    it('does not call fetch when passwords do not match', () => {
      render(<SignupPage />);
      fillValidForm({ confirm: 'different123' });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Validation — terms not accepted', () => {
    it('shows "You must agree to the Terms of Service." when terms are unchecked', async () => {
      render(<SignupPage />);
      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'john@test.com' } });
      fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
      // Do NOT click terms checkbox
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/must agree to the terms/i);
    });

    it('does not call fetch when terms are unchecked', () => {
      render(<SignupPage />);
      fillValidForm();
      // Uncheck the checkbox that fillValidForm checked
      fireEvent.click(screen.getByRole('checkbox'));
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Loading state', () => {
    it('submit button shows "Creating account..." and is disabled during request', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('button', { name: /creating account/i })).toBeDisabled();
    });
  });

  describe('Successful registration', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ token: 'test-token-abc' }),
      });
    });

    it('calls fetch with POST method and correct endpoint', async () => {
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toMatch(/\/api\/auth\/register/);
      expect(options.method).toBe('POST');
    });

    it('sends name, email and password in the request body', async () => {
      render(<SignupPage />);
      fillValidForm({ name: 'John Smith', email: 'john@test.com', password: 'password123', confirm: 'password123' });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body).toMatchObject({ name: 'John Smith', email: 'john@test.com', password: 'password123' });
    });

    it('stores the returned token in localStorage', async () => {
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await waitFor(() => expect(localStorage.getItem('auth_token')).toBe('test-token-abc'));
    });

    it('redirects to "/marketplace" after successful registration', async () => {
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await waitFor(() => expect(window.location.href).toBe('/marketplace'));
    });
  });

  describe('API error — non-ok response with message', () => {
    it('displays the server-provided error message', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Email already in use.' }),
      });
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/email already in use/i);
    });

    it('does not redirect on failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Error' }),
      });
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await screen.findByRole('alert');
      expect(window.location.href).toBe('');
    });

    it('does not store a token in localStorage on failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Error' }),
      });
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await screen.findByRole('alert');
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('API error — non-ok response without message', () => {
    it('displays the fallback error message', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => { throw new Error('no body'); },
      });
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/could not create account/i);
    });
  });

  describe('Network failure', () => {
    it('displays "Unable to connect." when fetch rejects', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/unable to connect/i);
    });

    it('submit button is re-enabled after network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      render(<SignupPage />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await screen.findByRole('alert');
      expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('all form inputs are associated with their labels via htmlFor/id', () => {
      render(<SignupPage />);
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('id', 'name');
      expect(screen.getByLabelText(/^email$/i)).toHaveAttribute('id', 'email');
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('id', 'password');
      expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('id', 'confirmPassword');
    });

    it('"Terms of Service" link inside label points to "/terms"', () => {
      render(<SignupPage />);
      expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute('href', '/terms');
    });

    it('"Privacy Policy" link inside label points to "/privacy"', () => {
      render(<SignupPage />);
      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy');
    });
  });
});
