import { MailOptions } from "nodemailer/lib/ses-transport/index.js";
import validatedEnv from "../../util/validatedEnv.js";

function mailOptions(toEmail: string, events: string): MailOptions {
    return {
        from: validatedEnv.NDML_EMAIL,
        to: toEmail,
        subject: "Registration Request Rejected",
        text: `Dear Participant,

Unfortunately, your registration request for ${events} has been rejected.
This can happen if your registration information were wrong or your payment proof was deemed invalid.

If you have any questions or need further assistance, please do not hesitate to contact our support team.

Best Regards,
Admin Team`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; overflow: hidden;">
      <div style="background-color: #4CAF50; color: white; padding: 16px; text-align: center; font-size: 24px;">
        Registration Rejected
      </div>
      <div style="padding: 16px;">
        <p style="font-size: 16px;">Dear Participant,</p>
        <p style="font-size: 16px;">We are sorry to inform you that your registration for ${events} has been rejected.</p>
        <p style="font-size: 16px;">This can happen if your registration information were wrong or your payment proof was deemed invalid.</p>
        <p style="font-size: 16px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
        <p style="font-size: 16px;">Best Regards,<br>Admin Team</p>
      </div>
      <div style="background-color: #f5f5f5; color: #666; text-align: center; font-size: 14px; padding: 16px;">
        &copy; ${new Date().getFullYear()} IIC TMSL. All rights reserved.
      </div>
    </div>
  `,
    }
};

export default mailOptions;
