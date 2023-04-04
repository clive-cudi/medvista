import { EMAIL_REGEX } from "./regex";
import nodemailer from "nodemailer";

export const validateEmail = (email: string) => {
    return email.match(
        EMAIL_REGEX
    );
};

export const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: text
        };

        const emailSendResponse = await transporter.sendMail(mailOptions);

        console.log(emailSendResponse);

        return emailSendResponse;
    } catch (err) {
        console.log(err);

        return null;
    }
};