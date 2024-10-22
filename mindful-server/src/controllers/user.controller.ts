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
            const { firstName, middleName, lastName, userName, email, role, password, phone } = req.body
            const savedUser = await this.userService.createUser({ firstName, middleName, lastName, userName, email, role, password, phone })

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
            return res.status(200).json({ message: "user found", user: user })
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
            return res.status(200).json({message: "fetched users successfully", users})
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const query  = {_id: req.params.id}
            const update  = req.body
            
            console.log("request parameters", query, update)

            const updateRes = await this.userService.updateUser(query, update)

            return res.status(201).json(updateRes)

        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { _id, email, userName } = req.query
        let query: any = {}
        try {
            if (req.params.id) {
                query  = {_id: req.params.id}
            } else if (_id) {
                query._id = _id
            } else if (email) {
                query.email = email
            } else if (userName) {
                query.userName = userName
            } else {
                throw new ValidationError("provide valid email or username")
            }
            const deletedUser = await this.userService.deleteUser(query)
            console.log("deleted user",deletedUser._id)
            return res.status(200).json({message: "user deleted successfully", userName: deletedUser.userName})
        } catch (error) {
            next(error)
        }
    }
}