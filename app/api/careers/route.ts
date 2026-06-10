import { NextResponse } from "next/server";
import { JobApplicationSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request data
    const result = JobApplicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, coverLetter, linkedinUrl } = result.data;
    const { jobId, jobTitle } = body; // Unvalidated auxiliary coordinates

    // Format HTML email profile dossier
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0A1128; border-bottom: 2px solid #FF555F; padding-bottom: 10px; text-transform: uppercase;">
          New Career Application
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Job Reference:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #4AABCA; text-transform: uppercase;">
              ${jobTitle} (${jobId})
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applicant Name:</td>
            <td style="padding: 8px 0; color: #0F172A;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Coordinates:</td>
            <td style="padding: 8px 0; color: #0F172A;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Coordinate:</td>
            <td style="padding: 8px 0; color: #0F172A;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">LinkedIn Profile:</td>
            <td style="padding: 8px 0; color: #0F172A;">
              ${linkedinUrl ? `<a href="${linkedinUrl}" target="_blank">${linkedinUrl}</a>` : "Not Provided"}
            </td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #FF555F; border-radius: 4px;">
          <h4 style="margin: 0 0 5px 0; color: #475569;">Cover Letter Pitch:</h4>
          <p style="margin: 0; color: #334155; line-height: 1.5; font-style: italic; white-space: pre-wrap;">&ldquo;${coverLetter}&rdquo;</p>
        </div>
        <p style="font-size: 10px; color: #94a3b8; margin-top: 30px; text-align: center; border-t: 1px solid #e2e8f0; pt: 10px;">
          Sumway Global Careers &copy; ${new Date().getFullYear()} — Talent Acquisition.
        </p>
      </div>
    `;

    // Deliver email notification
    await sendEmail({
      subject: `New Candidate Application: ${jobTitle} from ${name}`,
      html: htmlContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
