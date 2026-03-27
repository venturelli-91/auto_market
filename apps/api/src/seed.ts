import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './shared/db';

// ---------------------------------------------------------------------------
// Seed data — 20 realistic vehicle listings across 3 dealers
// Default password for all seed dealers: demo123
// ---------------------------------------------------------------------------

const SEED_PASSWORD = 'demo123';

const dealerDefs = [
  { name: 'AutoPrime Motors', email: 'contact@autoprime.com', location: 'CA' },
  { name: 'City Drive Center', email: 'sales@citydrivecenter.com', location: 'TX' },
  { name: 'Elite Auto Group', email: 'info@eliteauto.com', location: 'FL' },
];

const vehicles: Array<{
  make: string;
  model: string;
  year: number;
  trim: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  mileage: number;
  condition: string;
  color: string;
  features: string[];
  imageUrl: string;
  price: number;
}> = [
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    trim: 'XSE',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 28000,
    condition: 'excellent',
    color: 'Midnight Black',
    features: ['Heated Seats', 'Apple CarPlay', 'BSM'],
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    price: 26999,
  },
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    trim: 'SE',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 52000,
    condition: 'good',
    color: 'Silver',
    features: ['Backup Camera', 'Bluetooth', 'Cruise Control'],
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    price: 22499,
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    trim: 'SE',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    mileage: 12000,
    condition: 'like_new',
    color: 'Oxide Bronze',
    features: ['Safety Sense', 'Wireless CarPlay', 'LED Headlights'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
    price: 24999,
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    trim: 'Sport',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    mileage: 35000,
    condition: 'excellent',
    color: 'Sonic Gray',
    features: ['Honda Sensing', 'Sunroof', 'Android Auto'],
    imageUrl: 'https://images.unsplash.com/photo-1590474304245-52f150302d8e?w=800&h=600&fit=crop',
    price: 23499,
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    trim: 'EX',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    mileage: 68000,
    condition: 'good',
    color: 'Lunar Silver',
    features: ['Apple CarPlay', 'Heated Seats', 'Backup Camera'],
    imageUrl: 'https://images.unsplash.com/photo-1590474304245-52f150302d8e?w=800&h=600&fit=crop',
    price: 18999,
  },
  {
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    trim: 'EX-L',
    bodyType: 'SUV',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 29000,
    condition: 'excellent',
    color: 'Sonic Gray Pearl',
    features: ['AWD', 'Heated Seats', 'Power Tailgate', 'CarPlay'],
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop',
    price: 32999,
  },
  {
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    trim: 'XLT',
    bodyType: 'Truck',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 18000,
    condition: 'like_new',
    color: 'Agate Black',
    features: ['4WD', 'Tow Package', 'SYNC 4', 'Pro Trailer Backup'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-35ad025d2f9a?w=800&h=600&fit=crop',
    price: 48999,
  },
  {
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    trim: 'Lariat',
    bodyType: 'Truck',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 55000,
    condition: 'good',
    color: 'Iconic Silver',
    features: ['4WD', 'B&O Audio', 'Heated/Cooled Seats', 'Sunroof'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-35ad025d2f9a?w=800&h=600&fit=crop',
    price: 42999,
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    trim: 'Long Range',
    bodyType: 'Sedan',
    fuelType: 'electric',
    transmission: 'automatic',
    mileage: 14000,
    condition: 'like_new',
    color: 'Pearl White',
    features: ['Autopilot', 'Glass Roof', 'Premium Audio', '358mi Range'],
    imageUrl: 'https://images.unsplash.com/photo-1566023967268-de4d440ad079?w=800&h=600&fit=crop',
    price: 44999,
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    trim: 'Standard Range',
    bodyType: 'Sedan',
    fuelType: 'electric',
    transmission: 'automatic',
    mileage: 31000,
    condition: 'excellent',
    color: 'Midnight Silver',
    features: ['Autopilot', 'Navigation', 'Supercharging'],
    imageUrl: 'https://images.unsplash.com/photo-1566023967268-de4d440ad079?w=800&h=600&fit=crop',
    price: 36999,
  },
  {
    make: 'Tesla',
    model: 'Model Y',
    year: 2023,
    trim: 'Performance',
    bodyType: 'SUV',
    fuelType: 'electric',
    transmission: 'automatic',
    mileage: 9000,
    condition: 'like_new',
    color: 'Deep Blue Metallic',
    features: ['FSD Capable', 'Sport Mode', '303mi Range', 'Tow Hitch'],
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    price: 58999,
  },
  {
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    trim: '330i',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 38000,
    condition: 'excellent',
    color: 'Alpine White',
    features: ['xDrive AWD', 'Harman Kardon', 'HUD', 'Parking Assist'],
    imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop',
    price: 39999,
  },
  {
    make: 'BMW',
    model: '5 Series',
    year: 2021,
    trim: '530i',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 61000,
    condition: 'good',
    color: 'Mineral Grey',
    features: ['Driving Assist Plus', 'Harman Kardon', 'Heated Seats'],
    imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop',
    price: 36999,
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    year: 2023,
    trim: 'Carbon Edition',
    bodyType: 'SUV',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 11000,
    condition: 'like_new',
    color: 'Polymetal Grey',
    features: ['AWD', 'Bose Audio', 'HUD', 'Heated Seats', 'Sunroof'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
    price: 35999,
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    year: 2021,
    trim: 'Grand Touring',
    bodyType: 'SUV',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 47000,
    condition: 'good',
    color: 'Soul Red Crystal',
    features: ['AWD', 'Leather Seats', 'Apple CarPlay'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
    price: 29999,
  },
  {
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2022,
    trim: 'LT',
    bodyType: 'Truck',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 42000,
    condition: 'good',
    color: 'Summit White',
    features: ['4WD', 'Trailer Brake', 'Chevy Safety Assist'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-35ad025d2f9a?w=800&h=600&fit=crop',
    price: 41999,
  },
  {
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    trim: 'SEL',
    bodyType: 'SUV',
    fuelType: 'hybrid',
    transmission: 'automatic',
    mileage: 16000,
    condition: 'like_new',
    color: 'Shimmering Silver',
    features: ['AWD', 'Panoramic Sunroof', 'Blind Spot Warning'],
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop',
    price: 34499,
  },
  {
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2022,
    trim: 'SEL',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 33000,
    condition: 'excellent',
    color: 'Platinum Grey',
    features: ['Fender Audio', 'Heated Seats', 'Digital Cockpit'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3a142c6e38?w=800&h=600&fit=crop',
    price: 24499,
  },
  {
    make: 'Subaru',
    model: 'Outback',
    year: 2022,
    trim: 'Premium',
    bodyType: 'SUV',
    fuelType: 'gasoline',
    transmission: 'cvt',
    mileage: 39000,
    condition: 'excellent',
    color: 'Crystal White',
    features: ['Symmetrical AWD', 'EyeSight', 'Sunroof', 'CarPlay'],
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop',
    price: 31499,
  },
  {
    make: 'Audi',
    model: 'A4',
    year: 2021,
    trim: 'Premium Plus',
    bodyType: 'Sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 44000,
    condition: 'good',
    color: 'Glacier White',
    features: ['Quattro AWD', 'Virtual Cockpit', 'Matrix LED', 'B&O Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&h=600&fit=crop',
    price: 38999,
  },
];

// eslint-disable-next-line no-console
async function seed(): Promise<void> {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);
  const dealers = dealerDefs.map((d) => ({ ...d, passwordHash }));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert dealers
    const dealerIds: string[] = [];
    for (const dealer of dealers) {
      const { rows } = await client.query<{ id: string }>(
        `INSERT INTO dealers(name, email, password_hash, location)
         VALUES($1, $2, $3, $4)
         ON CONFLICT(email) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [dealer.name, dealer.email, dealer.passwordHash, dealer.location]
      );
      dealerIds.push(rows[0].id);
    }

    // Insert vehicles + images + listings
    for (let i = 0; i < vehicles.length; i++) {
      const v = vehicles[i];
      const dealerId = dealerIds[i % dealerIds.length];

      // Insert vehicle
      const { rows: vRows } = await client.query<{ id: string }>(
        `INSERT INTO vehicles(make, model, year, trim, body_type, fuel_type, transmission,
          mileage, condition, color, features)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING id`,
        [
          v.make,
          v.model,
          v.year,
          v.trim,
          v.bodyType,
          v.fuelType,
          v.transmission,
          v.mileage,
          v.condition,
          v.color,
          v.features,
        ]
      );
      const vehicleId = vRows[0].id;

      // Insert image
      await client.query(
        `INSERT INTO vehicle_images(vehicle_id, url, public_id, width, height, "order")
         VALUES($1,$2,$3,$4,$5,$6)`,
        [vehicleId, v.imageUrl, `seed-${vehicleId}`, 800, 600, 0]
      );

      // Insert listing as published
      await client.query(
        `INSERT INTO listings(dealer_id, vehicle_id, price, status, published_at)
         VALUES($1,$2,$3,'published', NOW())`,
        [dealerId, vehicleId, v.price]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeded ${dealers.length} dealers and ${vehicles.length} listings.`);
    console.log(`Login with any dealer email and password: ${SEED_PASSWORD}`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
