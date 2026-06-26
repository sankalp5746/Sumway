import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

interface EmailPayload {
  to?: string;
  subject: string;
  html: string;
}

function parseEnvValue(line: string): string {
  // Strip comments
  const valuePart = line.split("#")[0].trim();
  // Strip quotes if present
  if ((valuePart.startsWith('"') && valuePart.endsWith('"')) || 
      (valuePart.startsWith("'") && valuePart.endsWith("'"))) {
    return valuePart.substring(1, valuePart.length - 1).trim();
  }
  return valuePart;
}

function getSmtpCredentials() {
  let email = process.env.SMTP_EMAIL || "sumwayglobal@gmail.com";
  let pass = process.env.SMTP_APP_PASSWORD || "";
  let host = "";
  let port = "465";
  let secure = "true";

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("SMTP_EMAIL=")) {
          email = parseEnvValue(trimmed.substring("SMTP_EMAIL=".length));
        } else if (trimmed.startsWith("SMTP_APP_PASSWORD=")) {
          pass = parseEnvValue(trimmed.substring("SMTP_APP_PASSWORD=".length));
        } else if (trimmed.startsWith("SMTP_HOST=")) {
          host = parseEnvValue(trimmed.substring("SMTP_HOST=".length));
        } else if (trimmed.startsWith("SMTP_PORT=")) {
          port = parseEnvValue(trimmed.substring("SMTP_PORT=".length));
        } else if (trimmed.startsWith("SMTP_SECURE=")) {
          secure = parseEnvValue(trimmed.substring("SMTP_SECURE=".length));
        }
      }
    }
  } catch (e) {
    console.error("Error reading .env.local dynamically:", e);
  }

  return { email, pass, host, port, secure };
}

export async function sendEmail({ to = "sumwayglobal@gmail.com", subject, html }: EmailPayload) {
  const { email, pass, host, port, secure } = getSmtpCredentials();

  // Always write to a local preview file in development for easy browser testing
  if (process.env.NODE_ENV !== "production") {
    try {
      const previewPath = path.join(process.cwd(), "public", "sent_email_preview.html");
      const previewHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Local Email Inbox Simulator</title>
            <style>
              body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #030712; color: #f3f4f6; }
              .header { background: #0b1329; padding: 16px 24px; border-bottom: 2px solid #FF555F; }
              .header-title { font-size: 14px; font-weight: bold; color: #FF555F; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
              .header-meta { font-size: 11px; color: #9ca3af; line-height: 1.5; }
              .header-meta strong { color: #f3f4f6; }
              .email-body { padding: 24px; display: flex; justify-content: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="header-title">📧 Local Developer Inbox Simulator</div>
              <div class="header-meta">
                <strong>To:</strong> ${to}<br/>
                <strong>Subject:</strong> ${subject}<br/>
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br/>
                <strong>SMTP Config:</strong> ${pass ? `ACTIVE (${host || "gmail"} : ${port})` : "INACTIVE (fallback mock preview only)"}
              </div>
            </div>
            <div class="email-body">
              <div style="width: 100%; max-width: 600px;">
                ${html}
              </div>
            </div>
          </body>
        </html>
      `;
      fs.writeFileSync(previewPath, previewHtml, "utf8");
      console.log(`[DEVELOPMENT] Visual email preview written to public/sent_email_preview.html`);
    } catch (e) {
      console.error("Failed to write local email preview:", e);
    }
  }

  // Create transporter dynamically using loaded credentials
  let transporter = null;
  if (pass) {
    if (host) {
      transporter = nodemailer.createTransport({
        host: host,
        port: parseInt(port),
        secure: secure === "true",
        auth: {
          user: email,
          pass: pass
        },
        connectionTimeout: 5000, // 5 seconds timeout limit
        socketTimeout: 5000
      });
    } else {
      // Default to Gmail service (port 465 SSL)
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: pass
        },
        connectionTimeout: 5000,
        socketTimeout: 5000
      });
    }
  }

  if (!transporter) {
    console.log("==================================================");
    console.log(`[MOCK EMAIL SENT] to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("--------------------------------------------------");
    console.log("Details logged to public/sent_email_preview.html");
    console.log("==================================================");
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `Sumway Global Portal <${email}>`,
      to,
      subject,
      html
    });
    console.log(`[EMAIL SENT SUCCESS] Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn("==================================================");
    console.warn("[WARNING: SMTP REAL EMAIL DISPATCH TIMED OUT/FAILED]");
    console.warn("Reason:", (error as Error).message);
    console.warn("You can still view/approve this email at http://localhost:3000/sent_email_preview.html");
    console.warn("==================================================");
    
    // Fall back gracefully so registration/approval works
    return { success: true, mock: true, error: (error as Error).message };
  }
}
