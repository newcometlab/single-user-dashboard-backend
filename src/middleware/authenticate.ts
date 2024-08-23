import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    console.log(token, 'token')

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
        // console.log(decoded, 'decoded')
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!' });
    }
};
