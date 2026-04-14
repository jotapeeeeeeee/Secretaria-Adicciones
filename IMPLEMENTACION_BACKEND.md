# Implementacion y despliegue

## Que cambió

- El formulario de contacto del frontend ahora envía datos reales a una API.
- La API guarda cada consulta en base de datos.
- La API reenvía cada consulta al correo `jptoledo1302@gmail.com`.
- Se agregó autenticación JWT para consultar los mensajes desde un panel o cliente admin futuro.
- Ninguna clave SMTP ni secreto de autenticación queda expuesto en el frontend.

## Archivos principales

- `index.html`
- `backend/package.json`
- `backend/src/server.js`
- `backend/src/db.js`
- `backend/src/auth.js`
- `backend/src/mailer.js`
- `backend/.env.example`

## Como publicarlo

### Frontend

Tu frontend puede seguir en GitHub Pages:

`https://jotapeeeeeeee.github.io/Secretaria-Adicciones/`

Antes de publicar, cambiá en `index.html` esta línea:

```html
<meta name="api-base-url" content="http://localhost:4000">
```

por la URL real del backend, por ejemplo:

```html
<meta name="api-base-url" content="https://tu-backend.onrender.com">
```

### Backend

El backend no puede ejecutarse dentro de GitHub Pages. Tenés que desplegarlo en un servicio con Node.js, por ejemplo Render o Railway.

Pasos generales:

1. Subí la carpeta `backend/` a un repositorio o mantenela dentro del mismo repo.
2. Creá un servicio Node.js apuntando a `backend/`.
3. Configurá las variables de entorno usando `backend/.env.example` como plantilla.
4. Establecé `FRONTEND_ORIGIN=https://jotapeeeeeeee.github.io`
5. Usá `npm install` y `npm start` como comandos del servicio.

## Correo Gmail

Para que lleguen las consultas a `jptoledo1302@gmail.com`, usá:

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=jptoledo1302@gmail.com`
- `SMTP_PASS=<app-password-de-gmail>`
- `CONTACT_DESTINATION_EMAIL=jptoledo1302@gmail.com`

Importante:

- No uses tu contraseña normal de Gmail.
- Activá verificación en dos pasos.
- Generá una App Password desde la cuenta de Google.

## Autenticación

El backend crea automáticamente un usuario admin inicial con:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Ese usuario puede autenticarse en:

`POST /api/auth/login`

y luego consultar:

`GET /api/contact-messages`

con un token Bearer.

## Estado actual

Los botones y anclas existentes siguen funcionando como antes porque no se cambió la navegación ni el render dinámico de servicios, acordeones o links. Solo se reemplazó el submit simulado del formulario por uno real hacia la API.
