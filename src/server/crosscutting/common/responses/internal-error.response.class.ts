
import { IHTTPContextData } from "server-over-express";
import { Response } from "./response.class";

export class InternalErrorResponse extends Response {

    constructor(message: string, context: IHTTPContextData) {
        context.code = 500;
        super(`Internal server error: ${ message }`, context);
    }
}