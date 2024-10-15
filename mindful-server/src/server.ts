
import express, { Application, Request, Response, Express, NextFunction} from "express";
import cors from "cors";
import config from "./config/config";
import { connectDB } from './config/db.config'
import userRouter from "./routes/user.router";
import { error } from "console";
import { ICustomError } from "./models/error.model";
import { ErrorService } from "./services/error.service";
import authRouter from "./routes/auth.routes";

const createServer = (): Application => {
    const app: Express = express()
    const errorService = new ErrorService()

    app.use(cors())
    app.use(express.json());
    
    connectDB()
    
    app.use('/users', userRouter)
    app.use('/auth', authRouter)

    app.use((err: ICustomError, req: Request, res: Response, next: NextFunction) => {
        errorService.handleError(err, req, res, next)
    })

    return app
}

const startServer = (): void => {
    const app = createServer();

    app.listen(config.port, ()=> {
        console.log(`Server is running on: http://localhost:${config.port}`)
    })
}

startServer();

