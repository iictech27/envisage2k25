import { MailOptions } from "nodemailer/lib/smtp-transport/index.js";
import ndmlrTransport from "./nodemailer.js";
import resend from "./resend.js";
import { logErr, logInfo, logWarn } from "../../util/logger.js";
import validatedEnv from "../../util/validatedEnv.js";
import createHttpError from "http-errors";
import { httpCodes } from "../../util/httpCodes.js";

export const sendMail = async (mailOpts: MailOptions): Promise<any> => {
  if (!mailOpts.to || !mailOpts.subject || !mailOpts.text ) {
    logErr("Incorrect mail parameters", "sendMail @ services/email_handler.ts");
    throw createHttpError(
      httpCodes["502"].code,
      httpCodes["502"].message + ": Could not send email! Please try again later. Inconvenience regretted"
    )
  }

  try {
    const res = resend.emails.send({
      from: validatedEnv.RSND_FROM,
      to: [mailOpts.to?.toString()],
      subject: mailOpts.subject,
	  text: mailOpts.text.toString(),
	  html: mailOpts.html?.toString()
    });

    return res;
  } catch(error) {

    logWarn("Failed to send email using resend!", "sendMail @ services/email_handler.ts");
    logErr(error, "sendMail @ services/email_handler.ts");
    logInfo("Trying to send mail using gmail instead!", "sendMail @ services/email_handler.ts");

  }

  try {
    const res = await ndmlrTransport.sendMail(mailOpts);
    return res;
  } catch(error) {

    logWarn("Failed to send email using gmail!", "sendMail @ services/email_handler.ts");
    logErr(error, "sendMail @ services/email_handler.ts");

    throw createHttpError(
      httpCodes["502"].code,
      httpCodes["502"].message + ": Could not send email! Please try again later. Inconvenience regretted"
    )

  }
}
