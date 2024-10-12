import { CustomError, ServerError, ValidationError } from '../models/error.model'
import User, { IUser } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class AuthService {
    private secretKey: string | undefined
    constructor(secretKey = process.env.SECRET_KEY) {
        this.secretKey = "STRINGmeanttoBeSecrete"
    }

    login = async (email: string, password: string) => {

        // check if the use exists
        const user = await User.findOne({ email })
        console.log("found user: ", user)

        if (!user) {
            throw new ValidationError("Invalid Credentials, please try again")
        }
        let passMatch = await bcrypt.compare(password, user.password)
        console.log("match pass ", passMatch)

        if (user && passMatch) {
            // console.log("secrete key from env", this.secretKey, passMatch)
            user.isOnline = true
            await user.save()

            const token = jwt.sign(
                { userId: user._id, email: user.email, name: user.firstName, isOnline: user.isOnline, role: user.role },
                this.secretKey as string,
                { expiresIn: '1h' }
            )
            console.log("token succesfully generated", token)
            return token

        } else {
            // console.log("something went wrong")
            throw new ValidationError("Invalid Credentials, please try again")
        }
    }

    logout = async (email: string): Promise<any> => {
        const user = await User.findOne({email})
        if (user) {
            if (!user.isOnline) {
                return { message: "user is not logged in", procStatus: false } 
            }
            // implement token invalidation mechanism here .
            console.log("USER FOUND: ", user)
            user.isOnline = false
            await user.save()
            return {message: "user logged out successfully", procStatus: true } 
        }
        return {message: "User not found", procStatus: false} 
    }
    
}