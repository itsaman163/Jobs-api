import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company!!"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Please provide position!!"],
        maxlength: 150
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    number: {
        type: Number,
        required: [true, "Please Enter Mobile Number"]
    },
    link: {
        type: String,
        required: [false]
    },
    noticePeriod: {
        type: Number,
        required: [true, "Notice Period is Required"]
    },
    ctc: {
        type: Number
    },
    ectc: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

export default mongoose.model('Job', JobSchema);