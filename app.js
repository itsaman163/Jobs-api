import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
// extra security package
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';


import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import swaggerUI from 'swagger-ui-express';
import YAML from "yamljs";
const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'));
//
import express from 'express';
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const temp_folder_path = './public/temp/';
        if (!fs.existsSync('temp_folder_path')) {
            fs.mkdirSync(temp_folder_path, { recursive: true });
            fs.chmodSync(temp_folder_path, 0o777);
            cb(null, temp_folder_path);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const form = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(form.any());
// connect db
import connectDB from './db/connect.js';
// routes
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';
// error handler
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleWare from './middleware/error-handler.js';
import authenticationMiddleware from './middleware/authentication.js';

app.use(express.static('./public'))
app.use(express.json());

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit reach IP to 100 request per windowMs
}));
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listning on the port ${port}...`));

    } catch (error) {
        console.log(error)
    }
}

start();