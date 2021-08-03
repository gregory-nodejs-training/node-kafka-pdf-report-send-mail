import { BaseError } from "../../exceptions/BaseError";
import { logger } from "./Logger";

class ErrorHandler {

    public async handleError(err: Error): Promise<void> {
        logger.error(
            'Error message from de centralized error-handling component:\n',
            err
        );
        //could implement something like:
        // await sendMailToAdminIfCritical();
        // await sendEventsToSentry();
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

export const errorHandler = new ErrorHandler();