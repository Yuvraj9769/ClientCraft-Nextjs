/* eslint-disable @typescript-eslint/no-explicit-any */
import sendMail from "@/utils/sendMail";

const sendProjectMailToClient = async (data: any) => {
  try {
    const {
      clientEmail,
      clientName,
      projectName,
      status,
      budget,
      description,
      deadline,
    } = data;

    const htmlContent = `
       <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e5e7eb;">
    
    <div style="background-color: #4f46e5; color: white; padding: 20px; text-align: center;">
      <h2 style="margin: 0; font-size: 20px;">📄 Project Details Shared</h2>
      <p style="margin: 5px 0 0; font-size: 14px;">Here’s the latest info about your project</p>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 10px 8px 10px 0; font-weight: 600; vertical-align: top; width: 40%;">👤 Client Name:</td>
            <td style="padding: 10px 0; vertical-align: top;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px 10px 0; font-weight: 600; vertical-align: top;">💼 Project Name:</td>
            <td style="padding: 10px 0; vertical-align: top;">${projectName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px 10px 0; font-weight: 600; vertical-align: top;">📊 Status:</td>
            <td style="padding: 10px 0; vertical-align: top;">${status}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px 10px 0; font-weight: 600; vertical-align: top;">💰 Budget:</td>
            <td style="padding: 10px 0; vertical-align: top;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px 10px 0; font-weight: 600; vertical-align: top;">📝 Description:</td>
            <td style="padding: 10px 0; vertical-align: top; line-height: 1.5;">${description}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px 0 0; font-weight: 600; vertical-align: top;">📅 Deadline:</td>
            <td style="padding: 10px 0 0 0; vertical-align: top;">${new Date(
              deadline
            ).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
      This is an automated message. Please contact us if you have any questions.
    </div>
  </div>
</div>

      `;

    await sendMail(
      clientEmail,
      "Project Details",
      `Project details for ${clientName}`,
      htmlContent
    );
  } catch {
    throw new Error("Error in sending project mail to client");
  }
};

export default sendProjectMailToClient;
