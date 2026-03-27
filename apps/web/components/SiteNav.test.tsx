import React from 'react';
import { render, screen } from '@testing-library/react';
import { SiteNav } from './SiteNav';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('./NavLink', () => ({
  NavLink: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('./ThemeToggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme" />,
}));

jest.mock('../lib/landing-constants', () => ({
  NAV_LINKS: [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Contact', href: '/contact' },
  ],
}));

describe('SiteNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Logo', () => {
    it('renders the "DriveMatch" brand text', () => {
      render(<SiteNav />);
      expect(screen.getByText('DriveMatch')).toBeInTheDocument();
    });

    it('logo link points to "/"', () => {
      render(<SiteNav />);
      const logoLink = screen.getByRole('link', { name: /drivematch/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation links', () => {
    it('renders a nav landmark', () => {
      render(<SiteNav />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders a link for every entry in NAV_LINKS', () => {
      render(<SiteNav />);
      expect(screen.getByRole('link', { name: /marketplace/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    it('each nav link points to its correct href', () => {
      render(<SiteNav />);
      expect(screen.getByRole('link', { name: /marketplace/i })).toHaveAttribute('href', '/marketplace');
      expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    });
  });

  describe('Sign In CTA', () => {
    it('renders a "Sign In" link', () => {
      render(<SiteNav />);
      expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    });

    it('"Sign In" link points to "/login"', () => {
      render(<SiteNav />);
      expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
    });
  });

  describe('ThemeToggle slot', () => {
    it('renders the ThemeToggle component', () => {
      render(<SiteNav />);
      expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('decorative purple circle has aria-hidden="true"', () => {
      const { container } = render(<SiteNav />);
      const decorativeDot = container.querySelector('[aria-hidden="true"]');
      expect(decorativeDot).toBeInTheDocument();
    });
  });
});
