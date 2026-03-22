import { Pool, PoolClient } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export async function withRLS(
  callback: (client: PoolClient) => Promise<void>,
  dealerId: string
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET app.current_dealer_id = $1', [dealerId]);
    await callback(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getConnection(): Promise<PoolClient> {
  return pool.connect();
}

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});
