import mongoose from "mongoose";
import user from "../models/user.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const authorization = async (req, res, next) => {
    const adminRole = await user.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(req.user.userId) } }, { $project: { role: 1 } }])
    try {
        const role = adminRole[0]?.role || 'user';
        if (role && role === 'admin') {
            next();
        } else {
            throw new UnauthenticatedError("You are not authorized to access this api!!", 403);
        }
    } catch (error) {
        next(error);
    }
}
export default authorization;