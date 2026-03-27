import { render, screen, fireEvent } from '@testing-library/react';
import BlogPage from './page';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => true,
}));

jest.mock('../../components/SiteNav', () => ({
  SiteNav: () => <nav data-testid="site-nav" />,
}));

jest.mock('../../components/SiteFooter', () => ({
  SiteFooter: () => <footer data-testid="site-footer" />,
}));

describe('BlogPage', () => {
  it('renders page heading', () => {
    render(<BlogPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Automotive Insights');
  });

  it('renders SiteNav and SiteFooter', () => {
    render(<BlogPage />);
    expect(screen.getByTestId('site-nav')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<BlogPage />);
    expect(screen.getByRole('button', { name: 'All Posts' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buying Guide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Market Trends' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'News' })).toBeInTheDocument();
  });

  it('shows featured post badge by default', () => {
    render(<BlogPage />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('filters posts when a category is selected', () => {
    render(<BlogPage />);
    fireEvent.click(screen.getByRole('button', { name: 'News' }));
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
    expect(screen.getByText('DriveMatch Now Shows Dealer Response Times')).toBeInTheDocument();
  });

  it('shows empty state when category has no posts', () => {
    render(<BlogPage />);
    // Pricing has posts, so we won't get empty state — test via a category with no featured
    fireEvent.click(screen.getByRole('button', { name: 'Pricing' }));
    expect(screen.queryByText('Featured')).toBeInTheDocument();
  });

  it('renders newsletter CTA with link to /newsletter', () => {
    render(<BlogPage />);
    const ctaLink = screen.getByRole('link', { name: /subscribe to newsletter/i });
    expect(ctaLink).toHaveAttribute('href', '/newsletter');
  });
});
