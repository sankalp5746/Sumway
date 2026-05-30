import { NextResponse } from "next/server";
import { EnquirySchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request payload
    const result = EnquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email, company, serviceInterest, message } = result.data;

    // Compile styled HTML email notification
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0A0F1E; border-bottom: 2px solid #F5C542; padding-bottom: 10px; text-transform: uppercase;">
          New Website Enquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Full Name:</td>
            <td style="padding: 8px 0; color: #0F172A;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Coordinate:</td>
            <td style="padding: 8px 0; color: #0F172A;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 8px 0; color: #0F172A;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company Name:</td>
            <td style="padding: 8px 0; color: #0F172A;">${company || "Not Specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Service Interest:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #00C2B2;">${serviceInterest}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #F5C542; border-radius: 4px;">
          <h4 style="margin: 0 0 5px 0; color: #475569;">Customer Message:</h4>
          <p style="margin: 0; color: #334155; line-height: 1.5; font-style: italic;">&ldquo;${message}&rdquo;</p>
        </div>
        <p style="font-size: 10px; color: #94a3b8; margin-top: 30px; text-align: center; border-t: 1px solid #e2e8f0; pt: 10px;">
          Sumway Global Management Pvt. Ltd. &copy; ${new Date().getFullYear()} — Portal Invoicing Service.
        </p>
      </div>
    `;

    // Deliver email notification
    await sendEmail({
      subject: `New Enquiry from ${name} — ${serviceInterest}`,
      html: htmlContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
