import { Router } from 'express';
import { Pool } from 'pg';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export function createAuthRouter(pool: Pool): Router {
  const router = Router();

  const repository = new AuthRepository(pool);
  const service = new AuthService(repository);
  const controller = new AuthController(service);

  router.post('/login', controller.login);

  return router;
}
