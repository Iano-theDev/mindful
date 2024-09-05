import { NextFunction, Request, Response } from "express";
import { UserService } from '../services/user.service'
import { IUser } from "../models/user.model";
import { ValidationError } from "../models/error.model";
import { nextTick } from "process";
import config from "../config/config";

// const userService = new UserService();

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { firstName, middleName, lastName, userName, email, password, phone } = req.body
            const savedUser = await this.userService.createUser({ firstName, middleName, lastName, userName, email, password, phone })

            return res.status(201).json({ message: "user created successfully", user: savedUser })

        } catch (error: any) {
            next(error)
        }
    }

    getSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { _id, userName, email} = req.query
        const userId = req.params
        let query: any = {}
        try {
            // if (email) {
            //     query.email = email
            // } else if (userName) {
            //     query.userName = userName
            // } else 
            if (_id || userId) {
                console.log('user id param: ', userId);
                
                query._id = userId.id
            } else {
                let message = "Reqiuired parameters missing, please provide a userName, email or _id"
                throw new ValidationError(message)
            }

            const user = await this.userService.getOneUser(query)
            res.status(200).json({ message: "user found", user: user })
        } catch (error: any) {
            next(error)
        }
    }

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const docs_limit = config.docs_limit || 50
        let filter = req.query 
        try {
            const users = await this.userService.getUsers(filter)
            // console.log("we got this users", users)
            res.status(200).json({message: "fetched users successfully", users})
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response): Promise<any> => {
        try {

        } catch (error) {

        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { _id, email, userName } = req.query
        let query: any = {}
        try {
            if (_id) {
                query._id = _id
            } else if (email) {
                query.email = email
            } else if (userName) {
                query.userName = userName
            } else {
                throw new ValidationError("provide valid email or username")
            }
            await this.userService.deleteUser(query)
            res.status(204).json({message: "user deleted successfully"})
        } catch (error) {
            next(error)
        }
    }
}