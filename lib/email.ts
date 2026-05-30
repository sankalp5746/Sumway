import nodemailer from "nodemailer";

const SMTP_EMAIL = process.env.SMTP_EMAIL || "sumwayglobal@gmail.com";
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD;

// Create the Nodemailer transporter configuration
const transporter = SMTP_APP_PASSWORD 
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_APP_PASSWORD
      }
    })
  : null;

interface EmailPayload {
  to?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to = "sumwayglobal@gmail.com", subject, html }: EmailPayload) {
  if (!transporter) {
    // Graceful fallback for local development without credentials
    console.log("==================================================");
    console.log(`[MOCK EMAIL SENT] to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("--------------------------------------------------");
    console.log(html);
    console.log("==================================================");
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `Sumway Global Portal <${SMTP_EMAIL}>`,
      to,
      subject,
      html
    });
    console.log(`[EMAIL SENT SUCCESS] Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[EMAIL DELIVERY ERROR]", error);
    throw error;
  }
}
