import express, { NextFunction, Request, Response } from "express";
import { BaseError } from "./exceptions/BaseError";
import { router } from "./routes";
import { ApiUtil } from "./shared/utils/ApiUtil";
import { errorHandler } from "./shared/utils/ErrorHandler";

const app = express();

app.use(router);

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
    await errorHandler.handleError(err);
    if (!errorHandler.isTrustedError(err)) {
        response.status(500)
            .json(ApiUtil.createResponseError("Internal Server Error"));
    }
    response.status((err as BaseError).httpCode)
        .json(ApiUtil.createResponseError(err.message));
    next(err);
});

app.listen(3000, () => console.log("Server is running"));