import nodemailer from "nodemailer";
import { handleError } from "../helpers/handleError.js"

export const Contact = async (req, res) => {

    const { username, email, message } = req.body;
  
    if (!username || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      // Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });
  
      // Configurar el email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "vallegalan810@gmail.com", // A quién se enviará el mensaje
        subject: "New Contact Form Submission",
        text: `Name: ${username}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      // Enviar el email
      await transporter.sendMail(mailOptions);
  
      res.json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Error sending message" });
    }
  }