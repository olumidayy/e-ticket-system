import { Router, Request, Response } from 'express';
import auth from './auth/auth.routes';
import comments from './tickets/comments/comments.routes';
import tickets from './tickets/tickets/tickets.routes';
import users from './users/user.routes';

export default () => {
	const app = Router();
	auth(app);
	comments(app);
    home(app);
	tickets(app);
	users(app);

	return app;
}



let home = (app: Router) => {
	app.get('/', (req: Request, res: Response) => {
		res.json({
		  status: "success",
		  statusCode: 200,
		  message: "Welcome to e-Ticket.",
	  });
	});
}