import express, { Express , Router} from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login)


export default authRouter
