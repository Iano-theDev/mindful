import express, { Express , Router} from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.get('/logout', authController.logout)
authRouter.get('/verify', authController.verifyToken)



export default authRouter
