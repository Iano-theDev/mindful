// handles and encapsulates business logic
import User, {IUser} from '../models/user.model'
import bcrypt from 'bcryptjs'
import { NotFoundError, ValidationError } from '../models/error.model';
import { buildExclusionProjection } from '../utils/projsctions.utils'; 
import { strict } from 'assert';
import { UpdateOneModel } from 'mongoose';
export class UserService {
    // create a new user
    createUser = async (data: {firstName: string; middleName: string; lastName: string; userName: string; email: string; password: string; phone: string; }): Promise<IUser> => {
        try {
            // check if the use already exists
            const existingUser = await User.findOne({email: data.email})

            if (existingUser) {
                // throw new Error("User with this email already exists")
                throw new ValidationError("user with this email or username already exists")
                // throw new Error()
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
            throw error
        }
    }

    // get user
    getOneUser = async (query: any): Promise<IUser> => { // return type will always be IUser
        const excludeFields = ['password']
        const excludeProjection = buildExclusionProjection(excludeFields)
        try {
            const user  = await User.findOne(query, excludeProjection)
            if (!user) {
                throw new NotFoundError('user not found')
            }
            return user.toObject() as IUser;
        } catch (error) {
            throw error
        }
    }

    getUsers = async (filter: any): Promise<IUser[]> => {
        const excludeFields = ['password', '__v']
        const excludeProjection = buildExclusionProjection(excludeFields)
        try {
            const users = await User.find(filter, excludeProjection)

            // console.log("users in user service ", users)

            if (!users) throw new NotFoundError("no users found")
            return users
        } catch (error) {
            throw error
        }
    }

    updateUser = async (query: any, update: any) => {
        const options = {strict: true, runValidators: true}
        try {
            console.log("update object", update);
            if (update.password) {
                delete update.password
            }
            if (update.email) {
                delete update.email
            }
            const updateQuery = {
                $set: update
            }
            const updatedUser = await User.updateOne(query, updateQuery, options)
            if (!updatedUser.acknowledged) {
                throw new ValidationError("failed to update user")
            }
            if (updatedUser.matchedCount === 0) {
                throw new NotFoundError("user not found")
            }
            if (updatedUser.modifiedCount === 0) {
                return {message: "no changes were made to the user"}
            } 
            return {updatedUser, message: "user updated successfully"}
        } catch (error) {
            throw error
        }
        
    }

    // delete user 
    deleteUser = async (query: any): Promise<IUser> => {
        try {
            // console.log("query is: ", query)
            const user  = await User.findOneAndDelete(query)
            if (!user) {
                throw new NotFoundError('user not found')
            }
            return user
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }

}

// export default UserService