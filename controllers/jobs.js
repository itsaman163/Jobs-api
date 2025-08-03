import Job from "../models/job.js";
import BadRequestError from "../errors/bad-request.js";
import notFount from "../middleware/not-found.js";
import moment from "moment";
import mongoose from "mongoose";

const jobs = {
    getAllJobs: async (req, res) => {
        let jobs = await Job.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }
            },
            {
                $project: {
                    company: 1, position: 1, status: 1,
                    number: 1, link: 1, noticePeriod: 1,
                    ctc: 1, ectc: 1, createdBy: 1,
                    createdAt: 1, updatedAt: 1, 'userInfo.name': 1
                }
            }]);

        jobs = jobs.map(ele => {
            ele.createdAt = moment(ele.createdAt).format('YYYY-MM-DD HH:MM');
            return ele;
        })
        res.status(200).json({
            setting: { success: "1", massage: "fetched all Jobs..." },
            data: { jobs }
        });
    },

    getJob: async (req, res) => {
        const { user: { userId }, params: { id: jobId } } = req;

        const job = await Job.findOne({
            _id: jobId, createdBy: userId
        })
        if (!job) {
            throw new notFount(`no jobs find with this id ${jobId}`);
        }
        res.status(200).json({
            setting: { success: "1", massage: "successfully..." },
            data: { job }
        });
    },

    createJob: async (req, res) => {
        req.body.createdBy = req.user.userId;
        const job = await Job.create(req.body);
        res.status(200).json({
            setting: { success: "1", massage: "successfully..." },
            data: { job }
        });
    },

    updateJob: async (req, res) => {
        const {
            body: { company, position },
            user: { userId },
            params: { id: jobId }
        } = req;
        if (company === '' || position === '') {
            throw new BadRequestError("please provide company and position!!");
        }
        const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
        if (!job) {
            throw new notFount(`no jobs find with this id ${jobId}`);
        }
        res.status(200).json({
            setting: { success: "1", massage: "successfully..." },
            data: { job }
        });
    },

    deleteJob: async (req, res) => {
        const {
            user: { userId },
            params: { id: jobId }
        } = req;

        const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

        if (!job) {
            throw new notFount(`no jobs find with this id ${jobId}`);
        }
        res.status(200).json({
            setting: { success: "1", massage: "successfully deleted..." },
            data: { job }
        });
    },
}

export default jobs;