export interface ICustomError extends Error {
    status: number,
    name: string,
    message: string,
    full_error?: any
}


export class NotFoundError extends Error implements ICustomError{
    status: number;

    constructor (message: string) {
        super(message)
        this.status = 404;
        this.name = "NotFoundError"
    }
}

export class ValidationError extends Error implements ICustomError{
    status: number;

    constructor (message: string) {
        super(message)
        this.status = 400;
        this.name = "ValidationError"
    }
}

export class ServerError extends Error implements ICustomError{
    status: number;

    constructor () {
        super()
        this.message = "Internal server Error, try again later"
        this.status = 500;
        this.name = "ServerError"
    }
}
