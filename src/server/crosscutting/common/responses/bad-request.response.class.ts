import { IHTTPContextData } from "server-over-express";
import { Response } from "./response.class";

export class BadRequestResponse extends Response {

    constructor(message: string, context: IHTTPContextData) {
        context.code = 400;
        super(`Bad request: ${ message }`, context);
    }
}