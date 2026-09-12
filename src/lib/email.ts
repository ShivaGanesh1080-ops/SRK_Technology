import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srktechnology3527@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export async function sendApprovalEmail(
  toEmail: string, 
  studentName: string, 
  workshopTitle: string, 
  demoCertificateUrl: string
) {
  const mailOptions = {
    from: '"SRK TECHNOLOGY" <srktechnology3527@gmail.com>',
    to: toEmail,
    subject: `Your Registration is Approved: ${workshopTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-w-xl; margin: 0 auto; color: #333;">
        <h2 style="color: #0f172a;">Congratulations, ${studentName}!</h2>
        <p>Your payment has been successfully verified, and your seat for <strong>${workshopTitle}</strong> is now confirmed.</p>
        
        <p>We are excited to have you join us! Upon successful completion of this workshop, you will be awarded an official, verifiable Certificate of Completion.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Preview Your Certificate</h3>
          <p style="margin-bottom: 20px;">Want to see what you'll be earning? Click below to view a high-quality sample of the official SRK Technology certificate.</p>
          <a href="${demoCertificateUrl}" style="background-color: #0f172a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Demo Certificate</a>
        </div>

        <p>You can access your full Student Dashboard at any time to view your upcoming workshops.</p>
        
        <p>Best regards,<br/><strong>The SRK TECHNOLOGY Team</strong></p>
      </div>
    `,
  };

  try {
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.warn("WARNING: GMAIL_APP_PASSWORD is not set in .env. Email was not sent.");
      return false;
    }
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
}

export async function sendCompletionEmail(
  toEmail: string, 
  studentName: string, 
  workshopTitle: string, 
  certificateUrl: string
) {
  const mailOptions = {
    from: '"SRK TECHNOLOGY" <srktechnology3527@gmail.com>',
    to: toEmail,
    subject: `Your Certificate is Ready: ${workshopTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-w-xl; margin: 0 auto; color: #333;">
        <h2 style="color: #0f172a;">Congratulations, ${studentName}!</h2>
        <p>You have successfully completed the <strong>${workshopTitle}</strong> workshop.</p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-left: 4px solid #16a34a; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #166534;">Your Official Certificate</h3>
          <p style="margin-bottom: 20px;">Your verifiable Certificate of Completion is now ready to be viewed, downloaded, or shared on LinkedIn.</p>
          <a href="${certificateUrl}" style="background-color: #16a34a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Certificate</a>
        </div>

        <p>You can also access it at any time from your Student Dashboard.</p>
        
        <p>Best regards,<br/><strong>The SRK TECHNOLOGY Team</strong></p>
      </div>
    `,
  };

  try {
    if (!process.env.GMAIL_APP_PASSWORD) return false;
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending certificate email: ", error);
    return false;
  }
}
