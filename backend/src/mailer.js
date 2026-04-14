import nodemailer from "nodemailer";
import { config } from "./config.js";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpSecure,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass
  }
});

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(contact) {
  const fullName = `${contact.first_name} ${contact.last_name}`.trim();

  await transporter.sendMail({
    from: config.mailFrom,
    to: config.contactDestinationEmail,
    replyTo: contact.email,
    subject: `Nueva consulta web: ${contact.reason}`,
    text: [
      "Se recibio una nueva consulta desde el formulario web.",
      "",
      `Nombre: ${fullName}`,
      `Email: ${contact.email}`,
      `Telefono: ${contact.phone || "-"}`,
      `DNI: ${contact.dni || "-"}`,
      `Motivo: ${contact.reason}`,
      "",
      "Mensaje:",
      contact.message || "-"
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1A2733">
        <h2 style="color:#0068A5">Nueva consulta desde la web</h2>
        <p>Se registró una nueva consulta enviada desde el formulario público.</p>
        <table cellpadding="8" cellspacing="0" border="0">
          <tr><td><strong>Nombre</strong></td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(contact.email)}</td></tr>
          <tr><td><strong>Telefono</strong></td><td>${escapeHtml(contact.phone || "-")}</td></tr>
          <tr><td><strong>DNI</strong></td><td>${escapeHtml(contact.dni || "-")}</td></tr>
          <tr><td><strong>Motivo</strong></td><td>${escapeHtml(contact.reason)}</td></tr>
          <tr><td><strong>Mensaje</strong></td><td>${escapeHtml(contact.message || "-")}</td></tr>
          <tr><td><strong>Fecha</strong></td><td>${escapeHtml(contact.created_at)}</td></tr>
        </table>
      </div>
    `
  });
}
