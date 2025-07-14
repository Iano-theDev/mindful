import { Request, Response, NextFunction } from "express";
import User, { IUser } from '../models/user.model'
import { AuthService } from "../services/auth.service";
import jwt from 'jsonwebtoken'
import { CustomError, ValidationError } from "../models/error.model";
import { logger } from '../config/winston.config';
import { UserService } from "../services/user.service";

// ** NOTES TO DO 
// implement auth using supertokens node package


export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = new AuthService()
        this.userService = new UserService();
    }
    register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { firstName, middleName, lastName, userName, DOB, nationality, occupation, email, role, password, phone } = req.body
            let accType = {
                client: { active: false, label: "Client" },
                therapist: { active: false, label: "Therapist" },
                studentTherapist: { active: false, label: "Student Therapist" }
            };

            switch (role.code) {
                case 'client':
                     accType.client.active = true;
                    break;
                case 'therapist':
                    accType.therapist.active = true;
                    break;
                case 'studentTherapist':
                    accType.studentTherapist.active = true;
                    break;
                default:
                    console.log("No such role supported!");
                    throw new ValidationError("Unsupported role type: " + role.code);
            }

            console.log("Accout type when creating account is: ", accType)

            const savedUser = await this.userService.createUser({ firstName, middleName, lastName, nationality, occupation, userName, DOB, email, role: accType, password, phone })

            return res.status(201).json({ message: "user created successfully", user: savedUser })

        } catch (error: any) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            if (!email || !password) {
                throw new ValidationError("Please provide a valid email or username with the associated password.")
            }

            const token = await this.authService.login(email, password)
            return res.status(200).json({ message: "sign in successful", token: token })

        } catch (error: any) {
            next(error)
        }
    }

    logout = async (req: any, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "cant log out since user was not logged in log in" })
        }
        try {
            // logger.info("SECRET_KEY", SECRET_KEY)
            logger.info("TOKEN", token)

            const user: any = jwt.verify(token, process.env.SECRET_KEY as string)
            const result = await this.authService.logout(user.email)
            logger.info("result from logout service is ", result)
            res.status(201).json(result)

            // req.user = user
            logger.info("User is", user)

        } catch (error: any) {
            error.status = 401
            error.message = "invalid token, please login!"
            // check on this logc later, might be a mixup when calling the next function erro middleware
            logger.info("Token verification failed, ", error)
            // res.status(401).json({ error: 'Invalid token', });
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
            // logger.info("SECRET_KEY", SECRET_KEY)
            logger.info("TOKEN", token)

            const user = jwt.verify(token, process.env.SECRET_KEY as string)
            req.user = user
            logger.info("User is", user)
            next()
        } catch (error: any) {
            // check on this logc later, might be a mixup when calling the next function erro middleware
            logger.info("Token verification failed, ", error)
            res.status(401).json({ error: 'Invalid token', });
        }
    }

    verifyAccess = (requiredAccess: string) => {
        logger.info("inside access verifieer middlwware");
        return (req: any, res: Response, next: NextFunction) => {
            const user = req.user;
            if (user && user.access && user.access.includes(requiredAccess)) {
                logger.info(`Access granted for ${requiredAccess}`);
                next()
            } else {
                logger.info(`Access denied for ${requiredAccess}`);
                res.status(403).json({ message: "access forbiden. contact your admin" })
            }
        }
    }
}

