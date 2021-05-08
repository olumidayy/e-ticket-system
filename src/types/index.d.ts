import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ITicket } from '../interfaces/ITicket';
import { IComment } from '../interfaces/IComment';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TicketModel = Model<ITicket & Document>;
    export type CommentModel = Model<IComment & Document>;
  }
}
