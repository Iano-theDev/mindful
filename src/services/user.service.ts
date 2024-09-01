// handles and encapsulates business logic
import User, {IUser} from '../models/user.model'
import bcrypt from 'bcryptjs'

export class UserService {
    // create a new user
    createUser = async (data: {firstName: string; middleName: string; lastName: string; userName: string; email: string; password: string; phone: string; }): Promise<IUser> => {
        try {
            // check if the use already exists
            const existingUser = await User.findOne({email: data.email})

            if (existingUser) {
                throw new Error("User with this email already exists")
            }

            const hashedPassword = await bcrypt.hash(data.password, 10)

            // update user with hashedPass
            const user = new User({
                ...data,
                password: hashedPassword
            })

            await user.save();

            // return user without pass
            const {password, ...userWithoutPass} = user.toObject()
            return userWithoutPass as IUser
        } catch (error: any) {
            throw new Error(`Failed to create user: ${error.message}`)
        }
    }

    // update user
    
}

// export default UserService