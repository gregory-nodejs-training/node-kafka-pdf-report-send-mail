import { HttpStatusCode } from "../shared/entities/HttpStatusCode";
import { BaseError } from "./BaseError";

class APIError extends BaseError {

    constructor(name: string, httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR, isOperational = true, description = 'internal server error') {
        super(name, httpCode, description, isOperational);
    }
}

export { APIError };