import { Router, Request, Response, NextFunction } from 'express';
import UsersService from './users.service';
import { Joi, celebrate } from 'celebrate';
import { IUserUpdateDTO } from '../../interfaces/IUser';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get(
    '/',
    /**
     * TODO: Add middlewares
     */
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-All-Users endpoint');
      try {
        const users = await UsersService.GetAllUsers();
        return res.json({ data: users }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.get(
    '/:userId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-Ticket endpoint with params: %o', req.params);
      try {
        const user: any = await UsersService.GetUserById(req.params.userId);
        return res.json({ data: user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/:userId',
    
    celebrate({
        body: Joi.object({
            firstname: Joi.string(),
            lastname: Joi.string(),
        }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Edit-ticket endpoint with body: %o', req.body);
      try {
        const user = await UsersService.UpdateUser(
            req.body as IUserUpdateDTO,
            req.params.userId
        );
        return res.json({ data: user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.delete(
    '/:userId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete-Ticket endpoint with params: %o', req.params);
      try {
        const user: any = await UsersService.DeleteUser(req.params.userId);
        logger.debug('User deleted:', user);
        return res.json({ message: 'User deleted.' }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
}
