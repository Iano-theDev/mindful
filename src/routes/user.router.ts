import express, { Express , Router} from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.createUser)
userRouter.get('/:id', userController.getSingleUser)
userRouter.put('/:id', userController.updateUser)
userRouter.get('/', userController.getUsers)
userRouter.delete('/', userController.deleteUser)

export default userRouter

