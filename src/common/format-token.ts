import { Request } from 'express';
import jwt from 'jsonwebtoken';
import getTokenFromHeader from '../api/middlewares';
import config from '../config';

export default function formatToken(req: Request): any {
    let token = getTokenFromHeader(req);
    if(token) {
        let user: any = jwt.verify(token, config.jwtSecret!);
        return user._id;
    }
    return null;
}