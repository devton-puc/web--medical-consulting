export class HttpError extends Error {
    constructor(message, httpStatus, body) {
        super(message);
        this.name = "HttpError";
        this.httpStatus = httpStatus;
        this.body = body;
    }
}
