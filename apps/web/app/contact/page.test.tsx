import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from './page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../../components/SiteNav', () => ({
  SiteNav: () => <nav aria-label="site navigation" />,
}));

jest.mock('../../components/SiteFooter', () => ({
  SiteFooter: () => <footer />,
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

function fillContactForm() {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@test.com' } });
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'general' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello, I have a question.' } });
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ContactPage', () => {
  describe('Initial rendering', () => {
    it('renders the "Get in Touch" heading', () => {
      render(<ContactPage />);
      expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
    });

    it('renders the Full Name input', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    });

    it('renders the Email Address input', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it('renders the Subject select', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    });

    it('renders the Subject select with a placeholder option', () => {
      render(<ContactPage />);
      expect(screen.getByRole('option', { name: /select a subject/i })).toBeInTheDocument();
    });

    it('renders all 5 non-placeholder subject options', () => {
      render(<ContactPage />);
      expect(screen.getByRole('option', { name: /general inquiry/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /technical support/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /sales & pricing/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /dealer partnership/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /press & media/i })).toBeInTheDocument();
    });

    it('renders the Message textarea', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders the "Send Message" submit button', () => {
      render(<ContactPage />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('renders the Privacy Policy link pointing to "/privacy"', () => {
      render(<ContactPage />);
      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy');
    });

    it('does not show an error alert initially', () => {
      render(<ContactPage />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renders SiteNav', () => {
      render(<ContactPage />);
      expect(screen.getByRole('navigation', { name: /site navigation/i })).toBeInTheDocument();
    });

    it('renders SiteFooter', () => {
      render(<ContactPage />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders contact info labels (Email, Response Time, Location)', () => {
      render(<ContactPage />);
      expect(screen.getByText(/^email$/i)).toBeInTheDocument();
      expect(screen.getByText(/response time/i)).toBeInTheDocument();
      expect(screen.getByText(/location/i)).toBeInTheDocument();
    });

    it('renders the Quick Support callout', () => {
      render(<ContactPage />);
      expect(screen.getByText(/quick support/i)).toBeInTheDocument();
    });
  });

  describe('Form field interactions', () => {
    it('typing in Full Name updates its value', () => {
      render(<ContactPage />);
      const input = screen.getByLabelText(/full name/i);
      fireEvent.change(input, { target: { value: 'Jane' } });
      expect(input).toHaveValue('Jane');
    });

    it('typing in Email Address updates its value', () => {
      render(<ContactPage />);
      const input = screen.getByLabelText(/email address/i);
      fireEvent.change(input, { target: { value: 'jane@test.com' } });
      expect(input).toHaveValue('jane@test.com');
    });

    it('selecting a subject option updates the select value', () => {
      render(<ContactPage />);
      fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'support' } });
      expect(screen.getByLabelText(/subject/i)).toHaveValue('support');
    });

    it('typing in Message textarea updates its value', () => {
      render(<ContactPage />);
      const textarea = screen.getByLabelText(/message/i);
      fireEvent.change(textarea, { target: { value: 'Hello' } });
      expect(textarea).toHaveValue('Hello');
    });
  });

  describe('Loading state', () => {
    it('submit button shows "Sending..." and is disabled during request', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('button', { name: /sending/i })).toBeDisabled();
    });
  });

  describe('Successful submission', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    });

    it('calls fetch with POST method and correct endpoint', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toMatch(/\/api\/contact/);
      expect(options.method).toBe('POST');
    });

    it('sends form data in the request body', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body).toMatchObject({
        name: 'Jane Doe',
        email: 'jane@test.com',
        subject: 'general',
        message: 'Hello, I have a question.',
      });
    });

    it('shows "Message Sent!" heading after success', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('heading', { name: /message sent/i })).toBeInTheDocument();
    });

    it('hides the form after successful response', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await screen.findByRole('heading', { name: /message sent/i });
      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument();
    });

    it('shows "Send another message" button after success', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('button', { name: /send another message/i })).toBeInTheDocument();
    });
  });

  describe('"Send another message" flow', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    });

    it('clicking "Send another message" returns to the form view', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      fireEvent.click(await screen.findByRole('button', { name: /send another message/i }));
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('form fields are empty after clicking "Send another message"', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      fireEvent.click(await screen.findByRole('button', { name: /send another message/i }));
      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });

    it('"Message Sent!" is gone after reset', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      fireEvent.click(await screen.findByRole('button', { name: /send another message/i }));
      expect(screen.queryByRole('heading', { name: /message sent/i })).not.toBeInTheDocument();
    });
  });

  describe('API error — non-ok response', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    });

    it('shows "Failed to send message." error', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/failed to send message/i);
    });

    it('does not transition to the success state on error', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await screen.findByRole('alert');
      expect(screen.queryByRole('heading', { name: /message sent/i })).not.toBeInTheDocument();
    });

    it('submit button is re-enabled after error', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await screen.findByRole('alert');
      expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled();
    });

    it('error message uses role="alert"', async () => {
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Network failure', () => {
    it('shows "Unable to connect." error when fetch rejects', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/unable to connect/i);
    });

    it('submit button is re-enabled after network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      await screen.findByRole('alert');
      expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('Full Name input is associated with its label', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('id', 'name');
    });

    it('Email Address input is associated with its label', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('id', 'contact-email');
    });

    it('Subject select is associated with its label', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/subject/i)).toHaveAttribute('id', 'subject');
    });

    it('Message textarea is associated with its label', () => {
      render(<ContactPage />);
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('id', 'message');
    });

    it('error message uses role="alert"', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
      render(<ContactPage />);
      fillContactForm();
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('alert')).toBeInTheDocument();
    });
  });
});
