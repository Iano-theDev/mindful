import { Router } from "express";
import { TherapistController } from "../controllers/therapist.controller";

const therapistRouter =  Router()
const therapistController = new TherapistController()

therapistRouter.post('/createTherapist', therapistController.createUserAsTherapist)
therapistRouter.get('/', therapistController.getTherapists)
therapistRouter.delete('/', therapistController.deleteTherapist)

export default therapistRouter