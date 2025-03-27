import multer from "multer";
const storage = multer.diskStorage({
    filename: (_res, file, callback) => {
        // console.log(file);
        // console.log(_res);
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 100);
        callback(null, uniquePrefix + "-" + file.originalname);
    },
    destination: (_req, _file, callback) => {
        callback(null, "./public/uploads");
    },
});
const upload = multer({ storage: storage });
export default upload;
