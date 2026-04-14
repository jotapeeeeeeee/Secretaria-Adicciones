# Backend de Secretaria Adicciones

Este backend resuelve tres puntos que el frontend estático no puede cubrir por sí solo:

- guarda consultas en base de datos sin exponer credenciales al navegador;
- envía el formulario de contacto por correo a `jptoledo1302@gmail.com`;
- protege el acceso a los mensajes mediante autenticación con JWT.

## Stack

- Node.js + Express
- SQLite con `better-sqlite3`
- JWT para autenticación
- Nodemailer para el envío de correo

## Variables de entorno

Copiá `backend/.env.example` a `backend/.env` y completá los valores reales.

Campos importantes:

- `FRONTEND_ORIGIN`: la URL pública del frontend.
- `CONTACT_DESTINATION_EMAIL`: correo donde llegan las consultas.
- `SMTP_USER` y `SMTP_PASS`: credenciales SMTP. Si usás Gmail, conviene una App Password.
- `ADMIN_EMAIL` y `ADMIN_PASSWORD`: usuario inicial para acceder a `/api/contact-messages`.

## Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/contact`
- `GET /api/contact-messages` protegido con `Authorization: Bearer <token>`

## Ejecución local

```bash
cd backend
npm install
npm run dev
```

## Despliegue recomendado

Como el frontend actual está en GitHub Pages, el backend debe desplegarse aparte en una plataforma con ejecución de servidor, por ejemplo:

- Render
- Railway
- Fly.io
- VPS propio con PM2/Nginx

Usá estas variables en producción:

- `FRONTEND_ORIGIN=https://jotapeeeeeeee.github.io`
- `PORT` asignado por la plataforma
- resto de secretos solo en el panel del proveedor, nunca en `index.html`

## Flujo de contacto

1. El frontend envía la consulta a `POST /api/contact`.
2. El backend valida y guarda la consulta en SQLite.
3. El backend envía un correo al destinatario configurado.
4. El frontend muestra confirmación real solo si el backend respondió OK.
