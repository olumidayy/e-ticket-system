import { Router, Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { Joi, celebrate } from 'celebrate';
import { IUserCreateDTO } from '../../interfaces/IUser';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const { user, token }: any = await AuthService.SignUp(req.body as IUserCreateDTO);
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const { user, token }: any = await AuthService.SignIn({ email, password });
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.post(
    '/change-password',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        otp: Joi.number().required(),
        newPassord: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Change-Password endpoint with body: %o', req.body);
      try {
        const { email, newPassword, otp } = req.body;
        await AuthService.ChangePassword({ email, newPassword, otp });
        return res.json({ message: 'Password changed.' }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.post(
    '/send-otp',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Send-OTP endpoint with body: %o', req.body);
      try {
        await AuthService.SendRecoveryEmail(req.body.email);
        return res.json({ message: 'OTP sent.' }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
}
