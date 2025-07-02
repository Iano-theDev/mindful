
import express, { Application, Request, Response, Express, NextFunction } from "express";
import cors from "cors";
import config from "./config/config";
import { connectDB } from './config/db.config'
import userRouter from "./routes/user.routes";
import { ICustomError, ValidationError } from "./models/error.model";
import { ErrorService } from "./services/error.service";
import authRouter from "./routes/auth.routes";
import winston, { http } from "winston";

// import { MessageQueueService } from "./services/messagequeue.service";
import * as msgQueue from "./services/messagequeue.service";
import { MailService } from "./services/mial.service";
import therapistRouter from "./routes/therapist.routes";
import { logger } from "./config/winston.config";
import { AuthController } from "./controllers/auth.controller";

const createServer = (): Application => {
    const app: Express = express()
    const errorService = new ErrorService();
    const authController = new AuthController();

    let whiteList = ["http://localhost:4200", "https://mindful-dzwqarinw-ianothedevs-projects.vercel.app", "https://mindful-ashy.vercel.app"]

    app.use(cors({
        origin: function (origin: any, callback) {
            if (whiteList.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                console.log(`Request from: ${origin} Not allowed by cors`)
                callback(new ValidationError(`Request from: ${origin} Not allowed by cors`))
            }
        },
        credentials: true
    }))
    app.use(express.json());

    connectDB()
    startMsgQueue()

    app.use('/auth', authRouter)
    app.use('/users', authController.verifyToken, userRouter)
    app.use('/therapist', authController.verifyToken, therapistRouter)

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
    const server = app.listen(config.port, () => {
        const { address, port } = server.address() as { address: string, port: number };
        const host = address === '::' || address === '0.0.0.0' ? 'localhost' : address;

        logger.info(`Server is running on: http://${host}:${port}`)
    })
}

startServer();