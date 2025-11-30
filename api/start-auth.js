// api/start-auth.js
import { Resend } from "resend";

const codes = new Map();

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email?.endsWith("@brico-fashion.com")) {
    return res.status(400).json({ error: "Only brico-fashion.com emails allowed" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes.set(email, { code, created: Date.now() });

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Learn Darija <no-reply@brico-fashion.com>",
    to: email,
    subject: "Your 6-digit verification code",
    text: `Your 6-digit code is: ${code}`,
  });

  res.status(200).json({ success: true, message: "Code sent" });
}

export { codes };
