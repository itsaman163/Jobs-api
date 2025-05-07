import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/bad-request.js";
import User from "../models/user.js";
// import bcrypt from "bcryptjs";
const auth = {
    register: async (req, res) => {
        // const {name,email,password} = req.body;
        // const salt              = await bcrypt.genSalt(10);
        // const hashedPassword    = await bcrypt.hash(password,salt);
        // const tempUser          = {name,email,password:hashedPassword};
        const user = await User.create({ ...req.body });
        const token = user.generateJwt();
        res.status(200).json({
            setting: { success: "1", massage: "successfully..." },
            data: { user: user.name, token }
        });
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError("Please Provide email and password!!")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError("Invalid User!!");
        }
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {

            throw new UnauthenticatedError("Invalid User1!!", 400);
        }
        const token = user.generateJwt();


        res.status(201).json({
            setting: { success: "1", massage: "login success..." },
            data: { user: user.name, token }
        });
    },
    getAllUser: async (req, res, next) => {
        try {

            const user = await User.find().sort('createdAt');

            res.status(200).json({
                setting: { success: "1", massage: "fetched all Jobs..." },
                data: [...user]
            });

        } catch {

        }
    }
}

export default auth;