import { injectable } from "inversify";

@injectable()
export class LogService {

    constructor() { }

    public log(message: string) {
        console.log(message);
    }

    public warn(message: string) {
        console.warn(message);
    }

    public error(message: string) {
        console.error(message);
    }
}