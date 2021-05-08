
export class CustomError extends Error {
    constructor(
        message: string,
        status?: number
    ) {
        super();
    }
}