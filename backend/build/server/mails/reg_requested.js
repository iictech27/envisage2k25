import validatedEnv from "../../util/validatedEnv.js";
function mailOptions(toEmail) {
    return {
        from: validatedEnv.NDML_EMAIL,
        to: toEmail,
        subject: "Registration Request Recorded",
        text: `Dear Participant,

Your registration request has been successfully recorded. Please wait for a bit, while our admins view and validate your request. This typically take around 24hours.

If you have any questions or need further assistance, please do not hesitate to contact our support team.

Best Regards,
Admin Team`,
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; overflow: hidden;">
      <div style="background-color: #4CAF50; color: white; padding: 16px; text-align: center; font-size: 24px;">
        Registration Request Recorded
      </div>
      <div style="padding: 16px;">
        <p style="font-size: 16px;">Dear Participant,</p>
        <p style="font-size: 16px;">We are pleased to inform you that your registration request has been succesfully recorded.</p>
        <p style="font-size: 16px;">Please wait for a bit, while our admins view and validate your request. This typically takes around 24hours.</p>
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
;
export default mailOptions;
