
import { IHTTPContextData, IHTTPHeader, IHTTPResponse } from "server-over-express";
import { Readable } from "stream";

export class Response implements IHTTPResponse {

    public code: number = 200;
    public headers: IHTTPHeader[] = [];
    public stream?: Readable | undefined;
    private timestamp: number;

    constructor(private response: unknown, context: IHTTPContextData) {
        this.timestamp = new Date().getTime();
        this.code = context.code;
        this.stream = context.stream;
    }

    public reply(): unknown {
        const { code, headers, response, timestamp } = this;

        const reply = {
            code,
            headers,
            response,
            timestamp
        };

        return reply;
    }
}