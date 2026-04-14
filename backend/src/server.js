import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { authenticate, createToken, requireAuth } from "./auth.js";
import { createContactMessage, listContactMessages } from "./db.js";
import { sendContactEmail } from "./mailer.js";

const app = express();

// Support multiple origins (development + production)
const allowedOrigins = [
  config.frontendOrigin,
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://jotapeeeeeeee.github.io"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "secretaria-adicciones-backend" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await authenticate(String(email).trim().toLowerCase(), String(password));
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = createToken(user);
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

app.get("/api/contact-messages", requireAuth, (_req, res) => {
  res.json({ items: listContactMessages() });
});

app.post("/api/contact", async (req, res) => {
  const payload = normalizeContactPayload(req.body);
  const validationError = validateContactPayload(payload);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const savedMessage = createContactMessage(payload);
    await sendContactEmail(savedMessage);

    return res.status(201).json({
      ok: true,
      message: "Consulta enviada correctamente."
    });
  } catch (error) {
    console.error("Error while processing contact request", error);
    return res.status(500).json({
      error: "No se pudo enviar la consulta en este momento."
    });
  }
});

app.listen(config.port, () => {
  console.log(`Backend listening on http://localhost:${config.port}`);
});

function normalizeContactPayload(body = {}) {
  return {
    firstName: String(body.firstName || "").trim(),
    lastName: String(body.lastName || "").trim(),
    dni: String(body.dni || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    reason: String(body.reason || "").trim(),
    message: String(body.message || "").trim(),
    source: "website"
  };
}

function validateContactPayload(payload) {
  if (!payload.firstName) return "El nombre es obligatorio.";
  if (!payload.lastName) return "El apellido es obligatorio.";
  if (!payload.email) return "El correo electronico es obligatorio.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Ingresá un correo electronico valido.";
  }
  if (!payload.reason) return "Seleccioná un motivo para la consulta.";
  if (payload.dni && !/^\d{7,8}$/.test(payload.dni)) {
    return "El DNI debe tener 7 u 8 digitos.";
  }
  return null;
}
