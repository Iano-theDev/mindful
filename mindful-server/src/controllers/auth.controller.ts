import { Request, Response, NextFunction } from "express";
import User, { IUser } from '../models/user.model'
import { AuthService } from "../services/auth.service";
import jwt from 'jsonwebtoken'
import { ValidationError } from "../models/error.model";


export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService()
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            if (!email || !password) {
                throw new ValidationError("email and password are required")
            }

            const token = await this.authService.login(email, password)
            return res.status(200).json({ message: "sign in successful", token: token })

        } catch (error: any) {
            next(error)
        }
    }

    verifyToken = (req: any, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "access denied, please log in" })
        }
        try {
            // console.log("SECRET_KEY", SECRET_KEY)
            console.log("TOKEN", token)

            const user = jwt.verify(token, process.env.SECRET_KEY as string)
            req.user = user
            console.log("User is", user)
            next()
        } catch (error: any) {
            console.log("Token verification failed, ", error)
            res.status(401).json({ error: 'Invalid token', });
        }

    }

    verifyAccess = (requiredAccess: string) => {
        console.log("inside access verifieer middlwware");
        return (req: any, res: Response, next: NextFunction) => {
            const user = req.user;



            if (user && user.access && user.access.includes(requiredAccess)) {
                console.log(`Access granted for ${requiredAccess}`);
                next()
            } else {
                console.log(`Access denied for ${requiredAccess}`);
                res.status(403).json({ message: "access forbiden. contact your admin" })
            }
        }
    }
}

