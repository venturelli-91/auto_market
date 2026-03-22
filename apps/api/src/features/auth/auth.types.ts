export interface DealerRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  location: string | null;
  created_at: Date;
}

export interface JwtPayload {
  sub: string;   // dealer id
  email: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  dealer: {
    id: string;
    name: string;
    email: string;
  };
}
