import express from "express";
const Router = express.Router();
import auth from "../controllers/auth.js";
import authorization from "../middleware/authorization.js";
import authenticationMiddleware from "../middleware/authentication.js";

Router.post("/register", auth.register);
Router.post("/login", auth.login);
Router.route("/").get(authenticationMiddleware, authorization, auth.getAllUser);


export default Router;