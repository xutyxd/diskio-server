import { Readable } from "node:stream";
import { IHTTPContextData } from "server-over-express";

import { Response } from "./response.class";

export class StreamResponse extends Response {

    constructor(stream: Readable, context: IHTTPContextData) {
        super(undefined, context);
        
        this.code = 200;
        this.stream = stream;
        this.headers = context.headers;
    }
    public reply() {
        return;
    }
}