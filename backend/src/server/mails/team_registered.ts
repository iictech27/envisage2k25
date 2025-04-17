import { MailOptions } from "nodemailer/lib/ses-transport/index.js";
import validatedEnv from "../../util/validatedEnv.js";

function mailOptions(
  toEmail: string,
  teamName: string,
  problemTitle: string,
  problemCode: string
): MailOptions {
  return {
    from: validatedEnv.NDML_EMAIL,
    to: toEmail,
    subject: "Team Registration Successful – Hackathon",
    text: `Dear ${teamName},

Congratulations! Your team has been successfully registered for the hackathon with the selected problem statement titled "${problemTitle}" - ${problemCode}.

Please make sure to keep this email as confirmation of your registration.

If you have any questions or need further assistance, feel free to contact our support team.

Best Regards,  
Admin Team`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
      <div style="background-color: #007BFF; color: white; padding: 16px; text-align: center; font-size: 24px;">
        Team Registration Successful
      </div>
      <div style="padding: 16px;">
        <p style="font-size: 16px;">Dear <strong>${teamName}</strong>,</p>
        <p style="font-size: 16px;">We are excited to inform you that your team has been successfully registered for the hackathon.</p>
        <p style="font-size: 16px;">Your selected problem statement:</p>
        <blockquote style="background: #f9f9f9; border-left: 4px solid #ccc; margin: 10px 0; padding: 10px; font-size: 15px;">
          "${problemTitle}"
        </blockquote>
        <p style="font-size: 16px;">Keep an eye on your email inbox (and spam folder) for updates.</p>
        <p style="font-size: 16px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
        <p style="font-size: 16px;">Best Regards,<br>Admin Team</p>
      </div>
      <div style="background-color: #f5f5f5; color: #666; text-align: center; font-size: 14px; padding: 16px;">
        &copy; ${new Date().getFullYear()} IIC TMSL. All rights reserved.
      </div>
    </div>
  `,
  };
}

export default mailOptions;
