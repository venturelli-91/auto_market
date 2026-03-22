import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';
import { Gem, Car, BarChart3 } from 'lucide-react';

describe('FeatureCard', () => {
  it('renders the title', () => {
    render(<FeatureCard icon={Gem} title="Used Exotic Luxury" description="Premium vehicles at market value" />);
    expect(screen.getByText('Used Exotic Luxury')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<FeatureCard icon={Car} title="Modern Everyday Cars" description="Reliable vehicles for daily commute" />);
    expect(screen.getByText('Reliable vehicles for daily commute')).toBeInTheDocument();
  });

  it('renders the icon as an svg', () => {
    const { container } = render(
      <FeatureCard icon={BarChart3} title="Smart Investment" description="Data-driven pricing insights" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders different titles correctly', () => {
    const { rerender } = render(
      <FeatureCard icon={Gem} title="Title A" description="Description A" />
    );
    expect(screen.getByText('Title A')).toBeInTheDocument();

    rerender(<FeatureCard icon={Car} title="Title B" description="Description B" />);
    expect(screen.getByText('Title B')).toBeInTheDocument();
  });
});
