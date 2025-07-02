import config from "../config/config";
import nodemailer from 'nodemailer'
import { logger } from '../config/winston.config';
import * as fs from 'fs/promises';
import * as path from 'path';

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
         const templatePath = path.join(__dirname, '../templates/welcome-teplate.html');
          let htmlTemplate = await fs.readFile(templatePath, 'utf8');
          htmlTemplate =  htmlTemplate.replace('${userName}', userName);

        const mailOptions = {
            from: config.mindful_mail,
            to: userEmail,
            subject: "Welcome to mindful By Ian",
            html: htmlTemplate
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