import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: {
        name: process.env.USER!,
        address: process.env.USER!,
      },
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  } catch (error) {
    throw error;
  }
};

export default sendMail;
