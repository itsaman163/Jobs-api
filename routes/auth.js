import express from "express";
const Router = express.Router();
import auth from "../controllers/auth.js";

Router.post("/register",auth.register);
Router.post("/login",auth.login);

export default Router;