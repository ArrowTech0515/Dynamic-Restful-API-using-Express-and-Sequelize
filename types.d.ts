import { Request } from 'express';

declare module 'express' {
  export interface Request {
    results?: any;  // You can change `any` to a more specific type if needed
  }
}
