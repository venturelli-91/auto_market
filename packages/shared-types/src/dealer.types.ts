export enum DealerRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  AGENT = 'agent',
}

export interface DealerUser {
  id: string;
  dealerId: string;
  email: string;
  name: string;
  role: DealerRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  logo?: string; // Cloudinary URL
  description?: string;
  totalListings: number;
  averageRating: number;
  ratingCount: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
