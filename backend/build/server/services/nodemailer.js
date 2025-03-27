import nodemailer from "nodemailer";
import validatedEnv from "../../util/validatedEnv.js";
const transporter = nodemailer.createTransport({
    service: validatedEnv.NDML_SERVICE,
    host: validatedEnv.NDML_SMTP,
    port: validatedEnv.PORT,
    secure: false,
    auth: {
        user: validatedEnv.NDML_EMAIL,
        pass: validatedEnv.NDML_PASSWORD
    }
});
export default transporter;
