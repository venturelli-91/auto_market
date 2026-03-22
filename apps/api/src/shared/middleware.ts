import { Request, Response, NextFunction } from 'express';

export function requireDealerId(req: Request, res: Response, next: NextFunction): void {
  const dealerId = req.headers['x-dealer-id'] as string;

  if (!dealerId) {
    res.status(401).json({ error: 'Missing x-dealer-id header' });
    return;
  }

  (req as any).dealerId = dealerId;
  next();
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}
