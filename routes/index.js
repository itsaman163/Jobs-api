import express from 'express';
import authRouter from './auth.js';
import jobsRouter from './jobs.js';
import authenticationMiddleware from '../middleware/authentication.js';
import commonRouter from "./common.routes.js";

const Router = express.Router();

Router.use('/auth', authRouter);
Router.use("/jobs", authenticationMiddleware, jobsRouter);
Router.use("/common", commonRouter);

export default Router;