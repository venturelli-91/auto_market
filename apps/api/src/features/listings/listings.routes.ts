import { Router } from 'express';
import { Pool } from 'pg';
import { ListingsRepository } from './listings.repository';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';

export function createListingsRouter(pool: Pool): Router {
  const router = Router();

  const repository = new ListingsRepository(pool);
  const service = new ListingsService(repository);
  const controller = new ListingsController(service);

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);

  return router;
}
