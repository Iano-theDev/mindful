
import express, { Application, Request, Response, Express, NextFunction } from "express";
import cors from "cors";
import config from "./config/config";
import { connectDB } from './config/db.config'
import userRouter from "./routes/user.routes";
import { ICustomError } from "./models/error.model";
import { ErrorService } from "./services/error.service";
import authRouter from "./routes/auth.routes";
import winston from "winston";

// import { MessageQueueService } from "./services/messagequeue.service";
import * as msgQueue from "./services/messagequeue.service";
import { MailService } from "./services/mial.service";
import therapistRouter from "./routes/therapist.routes";
import { logger } from "./config/winston.config";

const createServer = (): Application => {
    const app: Express = express()
    const errorService = new ErrorService()


    app.use(cors())
    app.use(express.json());

    connectDB()
    startMsgQueue()

    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/therapist', therapistRouter)

    app.use((err: ICustomError, req: Request, res: Response, next: NextFunction) => {
        errorService.handleError(err, req, res, next)
    })

    return app
}

const startMsgQueue = async () => {
    // const msgQueue = new MessageQueueService()
    const mailService = new MailService();

    try {        
        await msgQueue.connect()
        await msgQueue.createQueue('email_tasks')
        await msgQueue.consume('email_tasks', mailService.processEmailQueue)
        // logger.info('Message queue consumers are running...');
        logger.info('Message queue consumers are running...');
    } catch (error) {
        logger.error("Failed to start messageQueue consumers", error)
    }

    const gracefulShutdown = async () => {
        logger.info("Shutting down gracefully...");
        await msgQueue.disconnect();
        process.exit(0);
    }

    process.on('SIGTERM', gracefulShutdown)
    process.on('SIGINT', gracefulShutdown)

}

const startServer = (): void => {
    const app = createServer();

    app.listen(config.port, () => {
        logger.info(`Server is running on: http://localhost:${config.port}`)
    })
}

startServer();