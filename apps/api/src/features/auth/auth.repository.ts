import { Pool } from 'pg';
import { DealerRow } from './auth.types';

export class AuthRepository {
  constructor(private readonly pool: Pool) {}

  async findByEmail(email: string): Promise<DealerRow | null> {
    const { rows } = await this.pool.query<DealerRow>(
      `SELECT id, name, email, password_hash, location, created_at
       FROM dealers
       WHERE lower(email) = lower($1)
       LIMIT 1`,
      [email]
    );
    return rows[0] ?? null;
  }
}
