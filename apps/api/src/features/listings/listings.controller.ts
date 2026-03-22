import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ListingsService } from './listings.service';

const filtersSchema = z.object({
  make:         z.string().optional(),
  model:        z.string().optional(),
  minPrice:     z.coerce.number().positive().optional(),
  maxPrice:     z.coerce.number().positive().optional(),
  minYear:      z.coerce.number().int().min(1900).optional(),
  maxYear:      z.coerce.number().int().max(2100).optional(),
  fuelType:     z.string().optional(),
  transmission: z.string().optional(),
  limit:        z.coerce.number().int().min(1).max(100).default(50),
  offset:       z.coerce.number().int().min(0).default(0),
});

export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = filtersSchema.parse(req.query);
      const { items, totalCount } = await this.service.findAll(filters);

      res.json({
        items,
        totalCount,
        hasNextPage: filters.offset + filters.limit < totalCount,
        hasPrevPage: filters.offset > 0,
        nextCursor: null,
      });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const listing = await this.service.findById(req.params.id);
      if (!listing) {
        res.status(404).json({ error: 'Listing not found' });
        return;
      }
      res.json(listing);
    } catch (err) {
      next(err);
    }
  };
}
