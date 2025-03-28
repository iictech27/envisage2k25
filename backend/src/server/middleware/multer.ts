import multer from "multer";
import { logInfo } from "../../util/logger.js";

const storage = multer.diskStorage({
  filename: (_res, file, callback) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 100);
    logInfo(`Multer received and stored file ${file.originalname} to disk.`, "storage @ middleware/multer.ts");
    callback(null, uniquePrefix + "-" + file.originalname);
  },
  destination: (_req, _file, callback) => {
    callback(null, "./public/uploads");
  },
});

const upload = multer({ storage: storage });
export default upload;
