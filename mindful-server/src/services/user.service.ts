// handles and encapsulates business logic
import User, { IUser } from '../models/user.model'
import bcrypt from 'bcryptjs'
import { NotFoundError, ValidationError } from '../models/error.model';
import { buildExclusionProjection } from '../utils/projsctions.utils';
import { MailService } from './mial.service';
import * as messageQueue from './messagequeue.service';
import Therapist, { ITherapist } from '../models/therapist.model';


export class UserService {
    private mailservice: MailService
    // private messageQueue: MessageQueueService
    constructor () {
        this.mailservice  = new MailService()
        // this.messageQueue = new MessageQueueService()
    }
    // create a new user
    createUser = async (data: { firstName: string; middleName: string; lastName: string; userName: string; email: string; role: string, password: string; phone: string; }): Promise<IUser> => {
        // check if the use already exists
        const existingUser = await User.findOne({ email: data.email })

        if (existingUser) {
            throw new ValidationError("user with this email or username already exists")
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        // update user with hashedPass
        const user = new User({
            ...data,
            password: hashedPassword
        })
        
        let userSaved = await user.save();
        if (userSaved) {
            const emailTask = {
                type: 'welcome',
                to: user.email,
                name: user.firstName
            }
            let info  = await messageQueue.sendToQueue('email_tasks', emailTask)
            // await this.messageQueue.consume('email_task', this.mailservice.processEmailQueue)

            console.log("Created user and added welcome email to queue ", info)
            // await this.mailservice.sendWelcomeMail(user.email, user.firstName)
        }

        // return user without pass
        const { password, ...userWithoutPass } = user.toObject()
        return userWithoutPass as IUser
    }

    // get user
    getOneUser = async (query: any): Promise<IUser> => { // return type will always be IUser
        const excludeFields = ['password']
        const excludeProjection = buildExclusionProjection(excludeFields)
            const user = await User.findOne(query, excludeProjection)
            if (!user) {
                throw new NotFoundError('user not found')
            }
            return user.toObject() as IUser;

    }

    getUsers = async (filter: any): Promise<IUser[]> => {
        const excludeFields = ['password', '__v']
        const excludeProjection = buildExclusionProjection(excludeFields)
            const users = await User.find(filter, excludeProjection)

            // console.log("users in user service ", users)

            if (!users) throw new NotFoundError("no users found")
            return users

    }

    updateUser = async (query: any, update: any) => {
        const options = { strict: true, runValidators: true }
    
            console.log("update object", update);
            // user email and password should  for this service 
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
                return { message: "no changes were made to the user" }
            }
            return { updatedUser, message: "user updated successfully" }

    }

    // delete user 
    deleteUser = async (query: any): Promise<IUser> => {
            // console.log("query is: ", query)
            const user = await User.findOneAndDelete(query)
            if (!user) {
                throw new NotFoundError('user not found')
            }
            return user
    }

    // createUserAsTherapist = async(query: any, therapistData: { age: number; nationality?: string; occupation: string; qualification: string; specialization: string[]; licenseNumber: string; rating: number; hourlyRate: number;}): Promise<ITherapist> => {
    createUserAsTherapist = async(query: any, therapistData: any): Promise<ITherapist> => {
        try {
            const user = await User.findOneAndDelete(query)
            if (!user) {
                throw new NotFoundError('createUserAsTherapist: user not found')
            }
            const newTherapist = new Therapist({
                ...therapistData
            })
            console.log("# Therapist created", newTherapist)
            return newTherapist
        } catch (error) {
            console.log("createUserAsTherapist error", error)
            throw error
        }
    }

}

// export default UserService