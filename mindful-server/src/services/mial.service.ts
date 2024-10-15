import config from "../config/config";
import nodemailer from 'nodemailer'

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
        console.log("Inside send welcome mail")
        const mailOptions = {
            from: config.mindful_mail,
            to: userEmail,
            subject: "Welcome to mindful",
            text: `Hello ${userName}\n\n we're very excited to have you on board!`,
            html: `<h1><b> Welcome </b></h1>`
        }
        console.log("mailOptions are: ", mailOptions)
        try {
            let info = await this.transporter.sendMail(mailOptions)
            console.log("Mail sent info is: ", info)
            return info
        } catch (error) {
            console.log("An error occured: ", error)

            throw error
        }
    }
}