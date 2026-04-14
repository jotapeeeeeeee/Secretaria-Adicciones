import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from backend.env in project root (one level up from backend/src/)
const envPath = path.resolve(__dirname, "..", "..", "backend.env");
dotenv.config({ path: envPath });
// Fallback to .env in backend/ directory
dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5500",
  jwtSecret: requireEnv("JWT_SECRET"),
  adminEmail: requireEnv("ADMIN_EMAIL"),
  adminPassword: requireEnv("ADMIN_PASSWORD"),
  contactDestinationEmail: requireEnv("CONTACT_DESTINATION_EMAIL"),
  smtpHost: requireEnv("SMTP_HOST"),
  smtpPort: Number(process.env.SMTP_PORT || 465),
  smtpSecure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
  smtpUser: requireEnv("SMTP_USER"),
  smtpPass: requireEnv("SMTP_PASS"),
  mailFrom: process.env.MAIL_FROM || "Secretaria Adicciones <no-reply@secretaria-adicciones.local>"
};
