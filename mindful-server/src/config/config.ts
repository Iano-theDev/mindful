import dotenv from 'dotenv'

dotenv.config()

const config: any = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGODB_URI,
    production: process.env.IS_PRODUCTION,
    docs_limit: process.env.DOC_LIMIT,
    mail_host: process.env.MAIL_HOST,
    mindful_mail: process.env.MINDFUL_EMAIL_ADDRESS,
    mindful_mail_pass: process.env.EMAIL_PASS,
    amqpUrl: process.env.AMQP_URL,
    amqpUser: process.env.AMQP_USER || 'guest',
    amqpPass: process.env.AMQP_PASS || 'guest',
}

export default config 