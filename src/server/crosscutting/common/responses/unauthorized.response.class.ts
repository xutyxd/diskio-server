import { IHTTPContextData } from "server-over-express";
import { Response } from "./response.class";

export class UnauthorizedResponse extends Response {

    constructor(message: string, context: IHTTPContextData) {
        context.code = 401;
        context.response = message;

        super(`Unauthorized: ${ message }`, context);
    }
}