import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../models/error.model"
import { TherapistService } from "../services/therapist.service"
import { ITherapist } from "../models/therapist.model"
import HTTP_STATUS from "../config/http.constants"
import { logger } from '../config/winston.config';

export class TherapistController {
    private therapistService: TherapistService
    constructor() {
        this.therapistService = new TherapistService()
    }
    createUserAsTherapist = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        // establish that credentials are needed to create a therapist

        const { email, userName, age, nationality, occupation, qualification, yearsOfExperience, specialization, licenseNumber, rating, hourlyRate } = req.body
        // logger.info("Request body holds: ", req.body)
        let therapistData = {
            email: email,
            age: age,
            nationality: nationality,
            occupation: occupation,
            qualification: qualification,
            yearsOfExperience: yearsOfExperience,
            specialization: specialization,
            licenseNumber: licenseNumber,
            rating: rating,
            hourlyRate: hourlyRate
        }
        logger.info(therapistData)
        let query: any = {}
        try {
            if (!email && !userName) {
                throw new ValidationError("provide valid email or username")
            }
            if (email) {
                query.email = email
            } else if (userName) {
                query.userName = userName
            }
            const createdTherapist = await this.therapistService.createTherapist(query, therapistData)
            return res.status(201).json({ message: "therapist created successfully", therapist: createdTherapist })
        } catch (error) {
            logger.info("createUserAsTherapist error", error)
            next(error)
        }
    }

    getTherapists = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        let filter = req.query
        try {
            const therapists = await this.therapistService.getTherapists(filter)
            // logger.info("we got this users", users)
            return res.status(200).json({ message: "fetched therapists successfully", therapists })

        } catch (error) {
            next(error)
        }
    }

    deleteTherapist = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        let deleteQuery: any = {}

        try {
            const { email, id } = req.query

            if (!email && !id) {
                throw new ValidationError("Invalid search parameters, provide email or id!")
            }
            if (email) {
                deleteQuery.email = email
            } else if (id) {
                deleteQuery.id = id
            }

            let deletedTherapist = await this.therapistService.deleteTherapist(deleteQuery)

            return res.status(HTTP_STATUS.OK).json({message: "therapist deleted successfully", email: deletedTherapist.email})

        } catch (error) {
            next(error)
        }

    }
}