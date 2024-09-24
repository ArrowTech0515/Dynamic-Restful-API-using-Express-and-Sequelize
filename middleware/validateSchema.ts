import asyncEndpoint from './asyncEndpoint';
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (...schemas: any[]) => {
  return asyncEndpoint(async (req: Request, res: Response, next: NextFunction) => {
    for (let schemaItem of schemas) {
      const { schema, path } = schemaItem;

      // Cast `req[path]` to `any` to resolve TypeScript error
      let validation = schema.validate((req as any)[path], { abortEarly: false });

      if (validation.error) {
        let messages = validation.error.details.map((i: any) => i.message);
        let errMessage = `Validation errors: ${messages.join(', ')}`;
        throw { status: 400, message: errMessage };
      }
    }
    next();
  });
};
