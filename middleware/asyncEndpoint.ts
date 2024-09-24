import { Request, Response, NextFunction } from 'express';

const asyncEndpoint = (endpoint: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await endpoint(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};

export default asyncEndpoint;
