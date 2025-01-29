import config from "../config/config";
import nodemailer from 'nodemailer'
import { logger } from '../config/winston.config';

export class MailService {
    private transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mail_host,
            secure: false,
            auth: {
                user: config.mindful_mail,
                pass: config.mindful_mail_pass
            }
        })
    }

    sendWelcomeMail = async (userEmail: string, userName: string) => {
        logger.info("Inside send welcome mail")
        const mailOptions = {
            from: config.mindful_mail,
            to: userEmail,
            subject: "Welcome to mindful",
            text: `Hello ${userName}\n\n we're very excited to have you on board!`,
            html: `<h1><b> Welcome </b></h1><br><p>Hello ${userName}\n\n we're very excited to have you on board!<p/>`
        }
        logger.info("mailOptions are: ", mailOptions)
        try {
            let info = await this.transporter.sendMail(mailOptions)
            logger.info("Mail sent info is: ", info)
            return info
        } catch (error) {
            logger.info("An error occured: ", error)
            throw error
        }
    }

    processEmailQueue = async (message: any) => {
        logger.info("Inside process email queue", message) 
        try {
            switch (message.type) {
                case 'welcome':
                    await this.sendWelcomeMail(message.to, message.name);
                    break;
                default:
                    logger.info('Unknown email task type', message.type)
            }

        } catch (error) {
            logger.info("Failed to process email queue: ", error);
            
        }
    }
}