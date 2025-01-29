import path from "path"
import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

const logFormat = winston.format.printf(({timestamp, level, message, stack, ...meta}) => {
    let metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    // cant read level when transformed to uppercase
    // level = (level.toUpperCase()).toString()
    // console.log("this is what we got in place of level: ", level)
    return `${timestamp} [${level}]: ${stack || message} ${metaString}`
})

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.errors({stack: true}),
        winston.format.json(),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            ),
        }),

        // for normal logs
        new DailyRotateFile({
            filename: path.join(__dirname + "../../logs/" + "app.%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "14d",
            zippedArchive: true
        }),

        // rotate file for err logs
        new DailyRotateFile({
            level: 'error',
            filename: path.join(__dirname + "../../logs" + "error.%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "14d",
            zippedArchive: true
        })
    ]
})