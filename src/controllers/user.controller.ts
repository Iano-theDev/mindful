import { Request, Response } from "express";
import { UserService } from '../services/user.service'
import { IUser } from "../models/user.model";

// const userService = new UserService();

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    createUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { firstName, middleName, lastName, userName, email, password, phone } = req.body
            const savedUser = await this.userService.createUser({ firstName, middleName, lastName, userName, email, password, phone })

            return res.status(201).json({ message: "user created successfully", user: savedUser })

        } catch (error: any) {
            const message = { message: "Server error, Failed to save user", error: error.message }
            console.log(message)
            return res.status(500).json(message)
        }
    }
}