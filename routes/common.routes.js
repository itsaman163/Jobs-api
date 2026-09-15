import express from "express";
const Router = express.Router();
import CommonController from "../controllers/v1/common.js";

Router.route("/get-pre-signed-url").get(CommonController.getPreSingedUrl);
Router.route("/generate-read-url").get(CommonController.generateReadUrl);

export default Router;