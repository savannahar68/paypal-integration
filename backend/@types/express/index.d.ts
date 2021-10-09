import "express";

declare global {
  namespace Express {
    interface Request {
      student?: Record<string, any>;
    }
  }
}
