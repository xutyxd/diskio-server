import { IHTTPContextData } from "server-over-express";
import { Response } from "./response.class";

export class RedirectResponse extends Response {

    constructor(path: string, context: IHTTPContextData) {
        super(undefined, context);
        
        this.code = 302;
        this.headers.push({ key: 'Location', value: path });
    }
    public reply() {
        return;
    }
}