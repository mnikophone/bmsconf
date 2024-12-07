import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Set up multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "/public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${uniqueSuffix}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

const uploadMiddleware = upload.single("file");

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to upload file." });
        return reject(err);
      }
      // Send back the uploaded file name
      const uploadedFileName = req.file.filename;
      res.status(200).json({
        message: "File uploaded successfully",
        fileName: uploadedFileName,
      });
      resolve();
    });
  });
}
