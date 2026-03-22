import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from './auth.service';

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export class AuthController {
  constructor(private readonly service: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = loginSchema.parse(req.body);
      const result = await this.service.login(input);

      if (!result) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
