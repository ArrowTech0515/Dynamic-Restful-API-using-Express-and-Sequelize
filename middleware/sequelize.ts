import { Request, Response, NextFunction } from 'express';
import asyncEndpoint from './asyncEndpoint';

export const create = (props: any) => {
  const route = async (req: Request, res: Response, next: NextFunction) => {
    const db = req.app.get('db');
    const model = db[props.model];
    if (!model) throw { status: 404, message: 'Model not found' };
    
    const results = await model.create(req.body);
    req.results = results;
    next();
  };
  return [asyncEndpoint(route), (req: Request, res: Response) => res.json(req.results)];
};

export const read = (props: any) => {
  const route = async (req: Request, res: Response, next: NextFunction) => {
    const db = req.app.get('db');
    const model = db[props.model];
    if (!model) throw { status: 404, message: 'Model not found' };
    
    const results = await model.findAll();
    req.results = results;
    next();
  };
  return [asyncEndpoint(route), (req: Request, res: Response) => res.json(req.results)];
};

export const findByPk = (props: any) => {
    const route = async (req: Request, res: Response, next: NextFunction) => {
      const db = req.app.get('db');
      const model = db[props.model];
      if (!model) {
        throw { status: 404, message: 'Model not found' };
      }
  
      const id = req.params[props.id]; // Extract ID from params
  
      // Check if ID is valid
      if (!id) {
        throw { status: 400, message: 'Invalid ID provided' };
      }
  
      const result = await model.findByPk(id);
  
      // If no customer found, throw 404 error
      if (!result) {
        return res.status(404).json({ message: `Customer with id ${id} not found` });
      }
  
      req.results = result;
      next();
    };
  
    return [asyncEndpoint(route), (req: Request, res: Response) => res.json(req.results)];
  };

  export const update = (props: any) => {
    const route = async (req: Request, res: Response, next: NextFunction) => {
      const db = req.app.get('db');
      const model = db[props.model];
  
      if (!model) {
        throw { status: 404, message: 'Model not found' };
      }
  
      const id = req.params[props.key]; // Extract ID from the request params
  
      // Validate the ID
      if (!id) {
        return res.status(400).json({ message: 'Invalid ID provided' });
      }
  
      // Perform the update
      const [updatedRowCount] = await model.update(req.body, {
        where: { id },
      });
  
      // If no rows were updated, the customer was not found
      if (updatedRowCount === 0) {
        return res.status(404).json({ message: `Customer with id ${id} not found` });
      }
  
      req.results = { message: `Customer with id ${id} updated successfully` };
      next();
    };
  
    return [asyncEndpoint(route), (req: Request, res: Response) => res.json(req.results)];
  };

  
  export const destroy = (props: any) => {
    const route = async (req: Request, res: Response, next: NextFunction) => {
      const db = req.app.get('db');
      const model = db[props.model];
  
      if (!model) {
        throw { status: 404, message: 'Model not found' };
      }
  
      const id = req.params[props.key]; // Extract ID from request params
  
      // Validate the ID
      if (!id) {
        return res.status(400).json({ message: 'Invalid ID provided' });
      }
  
      // Perform the delete operation
      const deletedRowCount = await model.destroy({
        where: { id },
      });
  
      // If no rows were deleted, the customer was not found
      if (deletedRowCount === 0) {
        return res.status(404).json({ message: `Customer with id ${id} not found` });
      }
  
      req.results = { message: `Customer with id ${id} deleted successfully` };
      next();
    };
  
    return [asyncEndpoint(route), (req: Request, res: Response) => res.json(req.results)];
  };
  
