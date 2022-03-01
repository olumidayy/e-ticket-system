import { Router, Request, Response, NextFunction } from 'express';
import CommentsService from './comments.service';
import { Joi, celebrate } from 'celebrate';
import { IComment, ICommentCreateDTO } from '../../../interfaces/IComment';
import logger from '../../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/comments', route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        ticketId: Joi.string().required(),
        authorId: Joi.string().required(),
        comment: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling New-Comment endpoint with body: %o', req.body);
      try {
        const comment: any = await CommentsService.AddComment(req.body as ICommentCreateDTO);
        return res.status(201).json({ data: comment });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-All-Comments endpoint');
      try {
        const comments = await CommentsService.GetAllComments();
        return res.json({ data: comments }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.get(
    '/:commentId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-Comment endpoint with params: %o', req.params);
      try {
        const comment: any = await CommentsService.GetCommentById(req.params.commentId);
        return res.json({ data: comment }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.get(
    '/ticket/:ticketId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-Comment endpoint with params: %o', req.params);
      try {
        const comment: any = await CommentsService.GetCommentsByTicketId(req.params.ticketId);
        return res.json({ data: comment }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/:commentId',
    
    celebrate({
        body: Joi.object({
          comment: Joi.string().required(),
        }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Edit-Comment endpoint with params: %o', req.params);
      try {
        const comment = await CommentsService.UpdateComment(req.body.comment, req.params.commentId);
        return res.json({ data: comment }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  

  route.delete(
    '/:commentId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete-Comment endpoint with params: %o', req.params);
      try {
        const comment: any = await CommentsService.DeleteComment(req.params.commentId);
        logger.debug('Comment deleted:', comment);
        return res.json({ message: 'Comment deleted.' }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
}
