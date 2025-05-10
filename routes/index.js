import express from 'express';
import authRouter from './auth.js';
import jobsRouter from './jobs.js';
import authenticationMiddleware from '../middleware/authentication.js';

const Router = express.Router();

Router.use('/auth', authRouter);
Router.use("/jobs", authenticationMiddleware, jobsRouter);

export default Router;