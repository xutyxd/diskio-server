import { IHTTPContextData } from "server-over-express";
import { Response } from "./response.class";

export class NotFoundResponse extends Response {

    constructor(message: string, context: IHTTPContextData) {
        context.code = 404;
        super(`Not found: ${ message }`, context);
    }
}