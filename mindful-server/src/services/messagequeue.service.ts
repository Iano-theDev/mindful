import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import config from '../config/config'
import { CustomError } from '../models/error.model';
import { runInThisContext } from 'vm';
import { logger } from '../config/winston.config';

// export class MessageQueueService {
let connection!: Connection;
let channel!: Channel;
let amqpUrl: string //= config.amqpUrl

// constructor() {
amqpUrl = `amqp://${config.amqpUser}:${config.amqpPass}@${config.amqpUrl}`
// }

export const connect = async (): Promise<void> => {
    try {
        connection = await amqp.connect(amqpUrl)
        channel = await connection.createChannel();
        logger.info("Connected to rabbit mq")

    } catch (error) {
        logger.info("Error connecting to rabbitMq", error)
        throw error
    }
}

export const disconnect = async (): Promise<void> => {
    try {
        await channel?.close();
        await connection?.close();
        logger.info("Disconnected from RabbitMQ!")

    } catch (error) {
        logger.info("Error disconnecting from rabbitMQ", error)
    }
}

export const isChannelConnected = (): boolean => {
    if (!channel) {
        let message = "Not connected to rabbitMQ";
        logger.info(message)
        throw new CustomError(message, 500, "messagequeue_error")
    }
    return true
}

export const createQueue = async (queueName: string): Promise<void> => {
    try {
        isChannelConnected();
        await channel.assertQueue(queueName, { durable: true })
        logger.info(`Queue ${queueName} created`);
    } catch (error) {
        let message = `Failded to create queue ${queueName} ${error}`
        logger.info(message)
        // throw new CustomError(message, 500, "messagequeue_error")
        throw error
    }
}

export const sendToQueue = async (queueName: string, message: any): Promise<boolean> => {
    logger.info("Message in send to que is: ", message);

    try {
        isChannelConnected();
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true })
    } catch (error) {
        logger.info("Error in send to queue")
        throw error
    }
}

export const consume = async (queueName: string, processor: (message: any) => Promise<void>) => {
    try {
        isChannelConnected();

        await channel.consume(queueName, async (msg: ConsumeMessage | null) => {
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString()) // typecasting hapa ...as string
                    await processor(content);
                    channel!.ack(msg)

                } catch (error) {
                    logger.info("Error processing message", error);
                    channel.nack(msg, false, false)
                }
            }
        })

    } catch (error) {
        console.error(`Failed to consume from queue ${queueName}:`, error);
        throw error
    }

}
// }