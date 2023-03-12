import express from "express";
const Router = express.Router();
import jobs from "../controllers/jobs.js";

Router.route("/").get(jobs.getAllJobs).post(jobs.createJob);
Router.route("/:id").post(jobs.getJob).patch(jobs.updateJob).delete(jobs.deleteJob);

export default Router;