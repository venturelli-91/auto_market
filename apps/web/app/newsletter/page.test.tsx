import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterPage from './page';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

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

function setup() {
  const user = userEvent.setup();
  render(<NewsletterPage />);
  return { user };
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>, email = 'jane@test.com') {
  await user.type(screen.getByLabelText(/email address/i), email);
  await user.click(screen.getByRole('button', { name: /subscribe for free/i }));
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

describe('NewsletterPage', () => {
  describe('Initial rendering', () => {
    it('renders the main heading', () => {
      setup();
      expect(
        screen.getByRole('heading', { name: /stay ahead of the market/i })
      ).toBeInTheDocument();
    });

    it('renders the "Join the Newsletter" subheading', () => {
      setup();
      expect(
        screen.getByRole('heading', { name: /join the newsletter/i })
      ).toBeInTheDocument();
    });

    it('renders the Email Address input', () => {
      setup();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it('renders the First Name input', () => {
      setup();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });

    it('renders the "Subscribe for Free" submit button', () => {
      setup();
      expect(
        screen.getByRole('button', { name: /subscribe for free/i })
      ).toBeInTheDocument();
    });

    it('does not show an error alert initially', () => {
      setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renders all three benefit cards', () => {
      setup();
      expect(screen.getByText(/weekly market trends/i)).toBeInTheDocument();
      expect(screen.getByText(/price drop alerts/i)).toBeInTheDocument();
      expect(screen.getByText(/exclusive deals/i)).toBeInTheDocument();
    });

    it('renders social proof stats', () => {
      setup();
      expect(screen.getByText(/12,000\+/)).toBeInTheDocument();
      expect(screen.getByText(/subscribers/i)).toBeInTheDocument();
    });

    it('renders SiteNav', () => {
      setup();
      expect(
        screen.getByRole('navigation', { name: /site navigation/i })
      ).toBeInTheDocument();
    });

    it('renders SiteFooter', () => {
      setup();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders the "What\'s included" checklist', () => {
      setup();
      expect(screen.getByText(/what's included/i)).toBeInTheDocument();
      expect(screen.getByText(/top market movers/i)).toBeInTheDocument();
    });
  });

  describe('Form field interactions', () => {
    it('typing in First Name updates its value', async () => {
      const { user } = setup();
      const input = screen.getByLabelText(/first name/i);
      await user.type(input, 'Jane');
      expect(input).toHaveValue('Jane');
    });

    it('typing in Email Address updates its value', async () => {
      const { user } = setup();
      const input = screen.getByLabelText(/email address/i);
      await user.type(input, 'jane@test.com');
      expect(input).toHaveValue('jane@test.com');
    });
  });

  describe('Loading state', () => {
    it('submit button shows "Subscribing..." and is disabled during request', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
      const { user } = setup();
      await user.type(screen.getByLabelText(/email address/i), 'jane@test.com');
      await user.click(screen.getByRole('button', { name: /subscribe for free/i }));
      expect(await screen.findByRole('button', { name: /subscribing/i })).toBeDisabled();
    });
  });

  describe('Successful subscription', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    });

    it('calls fetch with POST method and correct endpoint', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toMatch(/\/api\/newsletter/);
      expect(options.method).toBe('POST');
    });

    it('sends email in the request body', async () => {
      const { user } = setup();
      await fillAndSubmit(user, 'jane@test.com');
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body.email).toBe('jane@test.com');
    });

    it('sends name when provided', async () => {
      const { user } = setup();
      await user.type(screen.getByLabelText(/first name/i), 'Jane');
      await fillAndSubmit(user);
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body.name).toBe('Jane');
    });

    it('shows "You\'re In!" heading after success', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      expect(
        await screen.findByRole('heading', { name: /you're in/i })
      ).toBeInTheDocument();
    });

    it('hides the form after successful subscription', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await screen.findByRole('heading', { name: /you're in/i });
      expect(
        screen.queryByRole('button', { name: /subscribe for free/i })
      ).not.toBeInTheDocument();
    });

    it('shows "Subscribe another email" button after success', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      expect(
        await screen.findByRole('button', { name: /subscribe another email/i })
      ).toBeInTheDocument();
    });
  });

  describe('"Subscribe another email" reset flow', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    });

    it('clicking "Subscribe another email" returns to the form view', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await user.click(
        await screen.findByRole('button', { name: /subscribe another email/i })
      );
      expect(
        screen.getByRole('button', { name: /subscribe for free/i })
      ).toBeInTheDocument();
    });

    it('form fields are empty after reset', async () => {
      const { user } = setup();
      await user.type(screen.getByLabelText(/first name/i), 'Jane');
      await fillAndSubmit(user);
      await user.click(
        await screen.findByRole('button', { name: /subscribe another email/i })
      );
      expect(screen.getByLabelText(/first name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    });

    it('"You\'re In!" is gone after reset', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await user.click(
        await screen.findByRole('button', { name: /subscribe another email/i })
      );
      expect(
        screen.queryByRole('heading', { name: /you're in/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('API error — non-ok response', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    });

    it('shows "Failed to subscribe." error', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      expect(await screen.findByRole('alert')).toHaveTextContent(/failed to subscribe/i);
    });

    it('does not transition to success state on error', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await screen.findByRole('alert');
      expect(
        screen.queryByRole('heading', { name: /you're in/i })
      ).not.toBeInTheDocument();
    });

    it('submit button is re-enabled after error', async () => {
      const { user } = setup();
      await fillAndSubmit(user);
      await screen.findByRole('alert');
      expect(
        screen.getByRole('button', { name: /subscribe for free/i })
      ).not.toBeDisabled();
    });
  });

  describe('Network failure', () => {
    it('shows "Unable to connect." error when fetch rejects', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      const { user } = setup();
      await fillAndSubmit(user);
      expect(await screen.findByRole('alert')).toHaveTextContent(/unable to connect/i);
    });

    it('submit button is re-enabled after network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      const { user } = setup();
      await fillAndSubmit(user);
      await screen.findByRole('alert');
      expect(
        screen.getByRole('button', { name: /subscribe for free/i })
      ).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('Email Address input is associated with its label', () => {
      setup();
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
        'id',
        'newsletter-email'
      );
    });

    it('First Name input is associated with its label', () => {
      setup();
      expect(screen.getByLabelText(/first name/i)).toHaveAttribute(
        'id',
        'newsletter-name'
      );
    });

    it('error message uses role="alert"', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
      const { user } = setup();
      await fillAndSubmit(user);
      expect(await screen.findByRole('alert')).toBeInTheDocument();
    });
  });
});
