import 'dotenv/config';
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});
const CommonController = {
    getPreSingedUrl: async (req, res) => {
        const { fileName, fileType } = req.query;

        if (!fileName || !fileType) {
            return res.status(400).json({ error: "fileName and fileType required" });
        }

        const key = `${Date.now()}-${fileName}`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: fileType, // e.g., 'image/png', 'application/pdf', 'video/mp4'
        });

        // Signed URL expires in 300 seconds (5 minutes)
        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
        res.status(200).json({
            setting: { success: "1", massage: "successfully..." },
            data: { uploadUrl, key }
        });
    },
    generateReadUrl: async (key) => {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });
        // Signed URL expires in 1 hour (3600 seconds)
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url
    }
}

export default CommonController;