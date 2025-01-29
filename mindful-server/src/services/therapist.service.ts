import { NotFoundError } from '../models/error.model'
import User, { IUser } from '../models/user.model'
import Therapist, { ITherapist } from '../models/therapist.model'
import { logger } from '../config/winston.config';

export class TherapistService {
    // createUserAsTherapist = async(query: any, therapistData: { age: number; nationality?: string; occupation: string; qualification: string; specialization: string[]; licenseNumber: string; rating: number; hourlyRate: number;}): Promise<ITherapist> => {
    createTherapist = async (query: any, therapistData: any): Promise<ITherapist> => {
        const user = await User.findOne(query)
        logger.info("User is ", user)
        logger.info("Creating user as therapist: querying users using: ", query)
        if (!user) {
            throw new NotFoundError('createTherapist: user not found')
        }
        const newTherapist = new Therapist({
            therapistId: user._id,
            isActive: true,
            ...therapistData
        })

        let savedTherapist = await newTherapist.save()
        logger.info("# Therapist created", savedTherapist)
        return savedTherapist

    }

    getTherapists = async (query: any): Promise<ITherapist[]> => {
        const therapists = await Therapist.find(query)

        logger.info("Therapists found are: ", therapists)

        return therapists
    }

    deleteTherapist = async (query: any): Promise<ITherapist> => {
        const therapist = await Therapist.findOneAndDelete(query)

        logger.info("Therapists found are: ", therapist)
        if (!therapist) {
            throw new NotFoundError("Therapist Not Found")
        }
        return therapist
    }

}