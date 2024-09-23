import { Request, Response, NextFunction } from "express";
import { ICustomError } from "../models/error.model";

export class ErrorService {
    handleError = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {

        const statusCode = err.status || 500
        const errMessage = err.message  || "internal server error"
        const message = { type: err.name, error: errMessage, status_code: statusCode}

        if (statusCode === 500) {
           let full_error = err
           Object.assign(message, full_error)
        }
        console.log(message)
        return res.status(statusCode).json(message)
    }
}