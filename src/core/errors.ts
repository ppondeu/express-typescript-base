export class HttpException extends Error {
    constructor(public statusCode = 500, public message = "Internal Server Error") {
        super(message);
        this.name = "HttpError";

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(400, message);
        this.name = "BadRequestError";
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string = 'Unauthorized') {
        super(401, message);
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string = 'Forbidden') {
        super(403, message);
        this.name = "ForbiddenError";
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string = 'Not Found') {
        super(404, message);
        this.name = "NotFoundError";
    }
}

export class ConflictException extends HttpException {
    constructor(message: string = 'Conflict') {
        super(409, message);
        this.name = "ConflictError";
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(message: string = 'Unprocessable Entity') {
        super(422, message);
        this.name = "UnprocessableEntityError";
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(message: string = 'Internal Server Error') {
        super(500, message);
        this.name = "InternalServerErrorError";
    }
}