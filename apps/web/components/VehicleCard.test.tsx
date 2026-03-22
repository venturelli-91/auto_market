import { render, screen } from '@testing-library/react';
import { VehicleCard } from './VehicleCard';
import { Vehicle, Listing, PriceBadge, VehicleCondition, FuelType, Transmission } from '@automarket/shared-types';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock PriceScoreBadge component
jest.mock('./PriceScoreBadge', () => ({
  PriceScoreBadge: ({ score }: any) => (
    <div data-testid="price-badge">{score.badge}</div>
  ),
}));

const mockVehicle: Vehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Corolla',
  year: 2022,
  trim: 'S',
  bodyType: 'Sedan',
  fuelType: FuelType.GASOLINE,
  transmission: Transmission.AUTOMATIC,
  mileage: 45000,
  condition: VehicleCondition.EXCELLENT,
  color: 'Silver',
  features: ['Backup Camera', 'Bluetooth'],
  images: [
    {
      id: '1',
      url: 'https://example.com/image.jpg',
      publicId: 'test',
      width: 800,
      height: 600,
      order: 0,
      createdAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockListing: Listing = {
  id: 'listing-1',
  dealerId: 'dealer-1',
  vehicle: mockVehicle,
  price: 22999,
  priceScore: {
    badge: PriceBadge.GREAT_DEAL,
    confidence: 0.92,
    marketMedian: 25000,
    p25: 20000,
    p75: 30000,
    sampleSize: 1250,
  },
  status: 'published',
  publishedAt: new Date(),
  viewCount: 45,
  favoriteCount: 12,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('VehicleCard', () => {
  it('renders vehicle information correctly', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);

    // Check title
    expect(screen.getByText(/2022 Toyota Corolla/i)).toBeInTheDocument();

    // Check metadata
    expect(screen.getByText(/45,000 miles/i)).toBeInTheDocument();
    expect(screen.getByText(/Silver/i)).toBeInTheDocument();

    // Check price
    expect(screen.getByText('$22,999')).toBeInTheDocument();
  });

  it('renders price badge', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);
    const badge = screen.getByTestId('price-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(PriceBadge.GREAT_DEAL);
  });

  it('renders View Details button', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);
    const button = screen.getByRole('button', { name: /View Details/i });
    expect(button).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'aria-label',
      'View 2022 Toyota Corolla'
    );
  });

  it('links to the correct listing detail page', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/listings/listing-1');
  });

  it('renders vehicle image with correct attributes', () => {
    render(<VehicleCard listing={mockListing} vehicle={mockVehicle} />);
    const image = screen.getByAltText('2022 Toyota Corolla');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('handles missing vehicle image gracefully', () => {
    const vehicleNoImage = { ...mockVehicle, images: [] };
    render(<VehicleCard listing={mockListing} vehicle={vehicleNoImage} />);
    expect(screen.getByText('No image')).toBeInTheDocument();
  });

  it('formats price with comma separator', () => {
    const expensiveVehicle = { ...mockListing, price: 45999 };
    render(<VehicleCard listing={expensiveVehicle} vehicle={mockVehicle} />);
    expect(screen.getByText('$45,999')).toBeInTheDocument();
  });

  it('formats mileage with comma separator', () => {
    const highMileageVehicle = { ...mockVehicle, mileage: 125000 };
    render(
      <VehicleCard listing={mockListing} vehicle={highMileageVehicle} />
    );
    expect(screen.getByText(/125,000 miles/i)).toBeInTheDocument();
  });
});
