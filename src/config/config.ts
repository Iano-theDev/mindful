import dotenv from 'dotenv'

dotenv.config()

const config: any = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGODB_URI,
    production: process.env.IS_PRODUCTION,
}

export default config 