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
            console.log("secrete key from env", this.secretKey, passMatch)
            const token = jwt.sign(
                { userId: user.id, name: user.firstName, role: user.role },
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
}