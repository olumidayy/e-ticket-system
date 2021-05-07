import express, { NextFunction } from 'express';
import cors from 'cors';
// import routes from '../api';
// import config from '../config';

interface IError extends Error {
    status?: number;
  }

export default ({ app }: { app: express.Application }) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());


  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
//   app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found') as IError;
    err.status = 404;
    next(err);
  });

  /// error handlers
  app.use((err: IError, req: express.Request, res: express.Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status!)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err: IError, req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
