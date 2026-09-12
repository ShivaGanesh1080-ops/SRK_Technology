"use server"

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const category = formData.get("category") as string;
  const message = formData.get("message") as string;

  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error("GMAIL_APP_PASSWORD not set");
    return { success: false, error: "Server email configuration is missing." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "srktechnology3527@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"SRK TECHNOLOGY Contact" <srktechnology3527@gmail.com>',
    to: "srktechnology3527@gmail.com", // Send to yourselves!
    replyTo: email,
    subject: `New Contact Form Inquiry: ${category} from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Category:</strong> ${category}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send message." };
  }
}
