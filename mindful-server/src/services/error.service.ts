import { Request, Response, NextFunction } from "express";
import { ICustomError } from "../models/error.model";
import { logger } from '../config/winston.config';

export class ErrorService {
    handleError = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.status || 500
        const errMessage = err.message  || "internal server error"
        const messageStruct = { type: err.name, error: errMessage, status_code: statusCode}

        if (statusCode === 500) {
           let full_error = err
           Object.assign(messageStruct, full_error)
        }
        // logger.info(`ErrorService: ${JSON.stringify(messageStruct)}`)
        logger.info(`ErrorService:`, messageStruct)
        
        return res.status(statusCode).json(messageStruct)
    }
}