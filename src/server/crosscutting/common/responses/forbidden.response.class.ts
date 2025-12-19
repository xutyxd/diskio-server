
export class ForbiddenResponse extends Error {

    constructor(message: string, context: any) {
        super(message);

        context.status = 403;
    }
}