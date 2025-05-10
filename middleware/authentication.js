import { UnauthenticatedError } from '../errors/index.js';
import jwt from "jsonwebtoken";

const authenticationMiddleware = (req, resp, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError("No token provided!!!");
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // const user = User.findById(payload.userId).select('-password');
        req.user = { userId: payload.userId, name: payload.name };
        next();

    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access to this route");
    }
}

export default authenticationMiddleware;