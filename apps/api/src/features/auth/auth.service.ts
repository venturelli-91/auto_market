import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { AuthResponse, JwtPayload, LoginInput } from './auth.types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(input: LoginInput): Promise<AuthResponse | null> {
    const dealer = await this.repository.findByEmail(input.email);
    if (!dealer) return null;

    const valid = await bcrypt.compare(input.password, dealer.password_hash);
    if (!valid) return null;

    const payload: JwtPayload = {
      sub:   dealer.id,
      email: dealer.email,
      name:  dealer.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as `${number}${'s'|'m'|'h'|'d'}` });

    return {
      token,
      dealer: { id: dealer.id, name: dealer.name, email: dealer.email },
    };
  }
}
