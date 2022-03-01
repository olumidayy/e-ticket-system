import { Router, Request, Response, NextFunction } from 'express';
import TicketsService from './tickets.service';
import { Joi, celebrate } from 'celebrate';
import { ITicketCreateDTO, ITicketUpdateDTO } from '../../../interfaces/ITicket';
import logger from '../../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/tickets', route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        authorId: Joi.string().required(),
        description: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling New-Ticket endpoint with body: %o', req.body);
      try {
        const ticket: any = await TicketsService.CreateTicket(req.body as ITicketCreateDTO);
        return res.status(201).json({ data: ticket });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-All-Tickets endpoint');
      try {
        const tickets = await TicketsService.GetAllTickets();
        return res.json({ data: tickets }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.get(
    '/:ticketId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get-Ticket endpoint with params: %o', req.params);
      try {
        const ticket: any = await TicketsService.GetTicketById(req.params.ticketId);
        return res.json({ data: ticket }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/:ticketId',
    
    celebrate({
        body: Joi.object({
          ticket: Joi.string().required(),
        }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Edit-ticket endpoint with params: %o', req.params, 'body:', req.body);
      try {
        const ticket = await TicketsService.UpdateTicket(
            req.body as ITicketUpdateDTO,
            req.params.ticketId
        );
        return res.json({ data: ticket }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/:ticketId/open',
    
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Edit-ticket endpoint with params: %o', req.params);
      try {
        const ticket = await TicketsService.OpenTicket(req.params.ticketId);
        return res.json({ data: ticket }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/:ticketId/close',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Edit-ticket endpoint with params: %o', req.params);
      try {
        const ticket = await TicketsService.CloseTicket(req.params.ticketId);
        return res.json({ data: ticket }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.delete(
    '/:ticketId',

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete-Ticket endpoint with params: %o', req.params);
      try {
        const ticket: any = await TicketsService.DeleteTicket(req.params.ticketId);
        logger.debug('Ticket deleted:', ticket);
        return res.json({ message: 'Ticket deleted.' }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
}
