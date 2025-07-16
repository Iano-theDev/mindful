import { CustomError, ServerError, ValidationError } from '../models/error.model'
import User, { IUser } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { logger } from '../config/winston.config';

dotenv.config()

export class AuthService {
    private secretKey: string | undefined
    constructor(secretKey = process.env.SECRET_KEY) {
        this.secretKey = "STRINGmeanttoBeSecrete"
    }

    login = async (emailOrUsername: string, password: string) => {

        const user = await this.getUser(emailOrUsername)

        logger.info("found user: ", user)

        if (!user) {
            throw new ValidationError("Invalid Credentials, please try again")
        }
        let passMatch = await bcrypt.compare(password, user.password)
        logger.info("match pass ", passMatch)

        if (user && passMatch) {
            // logger.info("secrete key from env", this.secretKey, passMatch)
            user.isOnline = true
            await user.save()

            const token = jwt.sign(
                { userId: user._id, email: user.email, name: user.firstName, isOnline: user.isOnline, role: user.role },
                this.secretKey as string,
                { expiresIn: '2h' }
            )
            logger.info("token succesfully generated", token)
            return token

        } else {
            // logger.info("something went wrong")
            throw new ValidationError("Invalid Credentials, please try again")
        }
    }

    logout = async (email: string): Promise<any> => {
        const user = await this.getUser(email);

        if (user) {
            if (!user.isOnline) {
                 throw new ValidationError("user is not logged in")
                // return { message: "user is not logged in", procStatus: false }
            }
            // implement token invalidation mechanism here .
            logger.info("USER FOUND: ", user)
            user.isOnline = false
            await user.save()
            return { message: "user logged out successfully", procStatus: true }
        }
        return { message: "User not found", procStatus: false }
    }

    private getUser = async (emailOrUsername: string): Promise<any> => {
        return await User.findOne({
            $or: [
                { email: emailOrUsername.toLowerCase() },
                { userName: emailOrUsername }
            ]
        })

    }

}