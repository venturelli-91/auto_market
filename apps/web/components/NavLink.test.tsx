import { render, screen } from '@testing-library/react';
import { NavLink } from './NavLink';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('NavLink', () => {
  it('renders children correctly', () => {
    render(<NavLink href="/marketplace">Marketplace</NavLink>);
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<NavLink href="/marketplace">Marketplace</NavLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/marketplace');
  });

  it('applies correct styling classes', () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('font-medium');
    expect(link).toHaveClass('text-sm');
  });

  it('renders as an anchor element', () => {
    render(<NavLink href="/contact">Contact</NavLink>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
