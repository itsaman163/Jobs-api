import CustomApiError from './custom-errors.js';
import {StatusCodes} from 'http-status-codes';

class UnauthenticatedError extends CustomApiError{
    constructor(message){
        console.log("121212");
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;