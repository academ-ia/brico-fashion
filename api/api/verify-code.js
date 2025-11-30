// api/verify-code.js
import { codes } from "./start-auth.js";

export default function handler(req, res) {
  const { email, code } = req.body;
  const entry = codes.get(email);

  if (!entry) return res.status(400).json({ verified: false, message: "No code found" });
  if (Date.now() - entry.created > 10 * 60 * 1000)
    return res.status(400).json({ verified: false, message: "Code expired" });
  if (entry.code !== code)
    return res.status(400).json({ verified: false, message: "Invalid code" });

  codes.delete(email);
  res.status(200).json({ verified: true, email, token: Math.random().toString(36).slice(2) });
}
