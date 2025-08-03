import CustomApiError from './custom-errors.js';
import { StatusCodes } from 'http-status-codes';

class UnauthenticatedError extends CustomApiError {
    constructor(message, code) {
        super(message);
        this.statusCode = code || StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;