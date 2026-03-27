import React from 'react';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './SiteFooter';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../lib/landing-constants', () => ({
  FOOTER_SECTIONS: [
    {
      title: 'Platform',
      links: [
        { label: 'Browse', href: '/marketplace' },
        { label: 'Sell', href: '/sell' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
      ],
    },
  ],
}));

describe('SiteFooter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Brand block', () => {
    it('renders the "DriveMatch" brand name', () => {
      render(<SiteFooter />);
      expect(screen.getByText('DriveMatch')).toBeInTheDocument();
    });

    it('renders the tagline about market data', () => {
      render(<SiteFooter />);
      expect(screen.getByText(/market data/i)).toBeInTheDocument();
    });

    it('decorative brand dot has aria-hidden="true"', () => {
      const { container } = render(<SiteFooter />);
      const dot = container.querySelector('[aria-hidden="true"]');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('Footer sections', () => {
    it('renders a heading for every section in FOOTER_SECTIONS', () => {
      render(<SiteFooter />);
      expect(screen.getByRole('heading', { name: /platform/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /legal/i })).toBeInTheDocument();
    });

    it('section headings are h4 elements', () => {
      const { container } = render(<SiteFooter />);
      const headings = container.querySelectorAll('h4');
      expect(headings).toHaveLength(2);
    });

    it('renders all links within each section', () => {
      render(<SiteFooter />);
      expect(screen.getByRole('link', { name: /browse/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /sell/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
    });

    it('each link points to its correct href', () => {
      render(<SiteFooter />);
      expect(screen.getByRole('link', { name: /browse/i })).toHaveAttribute('href', '/marketplace');
      expect(screen.getByRole('link', { name: /sell/i })).toHaveAttribute('href', '/sell');
      expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy');
    });
  });

  describe('Copyright', () => {
    it('renders copyright text containing "2026"', () => {
      render(<SiteFooter />);
      expect(screen.getByText(/2026/)).toBeInTheDocument();
    });

    it('renders copyright text containing "DriveMatch"', () => {
      render(<SiteFooter />);
      // The copyright line contains "DriveMatch" — query by its full text
      expect(screen.getByText(/DriveMatch. All rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('Landmark', () => {
    it('wraps content in a contentinfo landmark', () => {
      render(<SiteFooter />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });
});
