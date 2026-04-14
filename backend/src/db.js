import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "..", "data");
const dbPath = path.join(dataDir, "secretaria.db");

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dni TEXT,
    phone TEXT,
    email TEXT NOT NULL,
    reason TEXT NOT NULL,
    message TEXT,
    source TEXT NOT NULL DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'nuevo',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const existingAdmin = db.prepare("SELECT id FROM users WHERE email = ?").get(config.adminEmail);
if (!existingAdmin) {
  const passwordHash = bcrypt.hashSync(config.adminPassword, 12);
  db.prepare(
    "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')"
  ).run(config.adminEmail, passwordHash);
}

export function createContactMessage(payload) {
  const stmt = db.prepare(`
    INSERT INTO contact_messages (
      first_name,
      last_name,
      dni,
      phone,
      email,
      reason,
      message,
      source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    payload.firstName,
    payload.lastName,
    payload.dni || null,
    payload.phone || null,
    payload.email,
    payload.reason,
    payload.message || null,
    payload.source || "website"
  );

  return db
    .prepare("SELECT * FROM contact_messages WHERE id = ?")
    .get(result.lastInsertRowid);
}

export function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function listContactMessages() {
  return db
    .prepare(
      `SELECT id, first_name, last_name, dni, phone, email, reason, message, status, source, created_at
       FROM contact_messages
       ORDER BY datetime(created_at) DESC`
    )
    .all();
}
