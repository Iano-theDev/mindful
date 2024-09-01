
import express, { Application, Express} from "express";
import cors from "cors";
import config from "./config/config";
import { connectDB } from './config/db.config'
import userRouter from "./routes/user.router";

const createServer = (): Application => {
    const app: Express = express()

    app.use(cors())
    app.use(express.json());
    
    connectDB()
    
    app.use('/users', userRouter)

    return app
}

const startServer = (): void => {
    const app = createServer();

    app.listen(config.port, ()=> {
        console.log(`Server is running on: http://localhost:${config.port}`)
    })
}

startServer();

