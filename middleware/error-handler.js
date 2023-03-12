// import CustomApiError from "../errors/index.js";
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, resp, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }
    // if(err instanceof CustomApiError){
    //     return resp.status(err.statusCode).json(err.message);
    // }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    //   resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    return resp.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware;