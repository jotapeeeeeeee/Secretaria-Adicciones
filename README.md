# Secretaría de Políticas Integrales sobre Adicciones - Tucumán

[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org)

## Descripción del Proyecto

Sitio web oficial de la **Secretaría de Políticas Integrales sobre Adicciones** de la Provincia de Tucumán, Argentina. Plataforma informativa con sistema de consultas por correo electrónico y panel administrativo.

### Dependencia Institucional
- Organismo dependiente de la **Secretaría de Gestión Sanitaria**
- Ministerio de Salud Pública de Tucumán

---

## 🌟 Características Principales

### Frontend (Sitio Público)
- ✅ Diseño responsive con estética moderna y profesional
- ✅ Información institucional completa (misión, servicios, organismos)
- ✅ Formulario de contacto con validación en tiempo real
- ✅ Sección de noticias y eventos
- ✅ Directorio de organismos relacionados
- ✅ Información de contacto y horarios
- ✅ Navegación accesible con breadcrumbs

### Backend (API REST)
- ✅ Base de datos SQLite para almacenamiento de consultas
- ✅ Autenticación JWT para acceso administrativo
- ✅ Envío automático de correos mediante Nodemailer
- ✅ Validación y sanitización de datos de formulario
- ✅ CORS configurado para origen específico
- ✅ Endpoints protegidos con autenticación Bearer Token

---

## 🏗️ Arquitectura del Proyecto

```
Secretaria-Adicciones/
├── index.html                    # Frontend estático (sitio principal)
├── render.yaml                   # Configuración de despliegue en Render
├── Procfile                      # Especificación de procesos
├── .gitignore                    # Archivos ignorados por Git
├── README.md                     # Este archivo
├── DEPLOYMENT.md                 # Guía completa de despliegue
├── IMPLEMENTACION_BACKEND.md     # Documentación técnica del backend
│
└── backend/                      # Servidor Node.js
    ├── src/
    │   ├── server.js             # Punto de entrada principal (Express)
    │   ├── config.js             # Gestión de variables de entorno
    │   ├── db.js                 # Capa de base de datos (SQLite)
    │   ├── auth.js               # Autenticación JWT
    │   └── mailer.js             # Servicio de envío de correos
    ├── data/                     # Directorio de base de datos (auto-generado)
    ├── package.json              # Dependencias del backend
    ├── .env.example              # Plantilla de variables de entorno
    └── README.md                 # Documentación específica del backend
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** + **CSS3** (Vanilla, sin frameworks)
- **Google Fonts**: Fraunces (títulos) + DM Sans (cuerpo)
- **Diseño**: Gradientes, glassmorphism, animaciones CSS
- **Responsive**: Mobile-first approach

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.21
- **Base de Datos**: SQLite 3 (better-sqlite3)
- **Autenticación**: JSON Web Tokens (jsonwebtoken)
- **Email**: Nodemailer 6.10
- **Seguridad**: bcryptjs para hashing de contraseñas
- **CORS**: Configurado para origen específico

---

## 🚀 Instalación y Configuración Local

### Prerequisitos
- Node.js 18 o superior
- npm (viene con Node.js)
- Git (opcional, para clonar el repositorio)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git
cd Secretaria-Adicciones
```

### Paso 2: Configurar el Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
copy .env.example .env    # Windows
# cp .env.example .env    # Linux/Mac
```

### Paso 3: Configurar variables de entorno

Editar el archivo `backend/.env` con tus credenciales:

```env
PORT=4000
NODE_ENV=development
FRONTEND_ORIGIN=http://127.0.0.1:5500

# JWT Secret (generar uno único)
JWT_SECRET=tu-secreto-super-seguro-aqui

# Admin credentials
ADMIN_EMAIL=admin@secretaria.local
ADMIN_PASSWORD=tu-password-seguro

# Email configuration
CONTACT_DESTINATION_EMAIL=jptoledo1302@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tu-cuenta@gmail.com
SMTP_PASS=tu-app-password-de-gmail
MAIL_FROM="Secretaria Adicciones <no-reply@secretaria-adicciones.local>"
```

#### 📧 Configurar Gmail SMTP

1. **Activar verificación en dos pasos** en tu cuenta de Google
2. **Generar App Password**:
   - Ir a: https://myaccount.google.com/apppasswords
   - Seleccionar "Mail" y tu dispositivo
   - Copiar la contraseña de 16 caracteres generada
   - Usar esa contraseña en `SMTP_PASS`

> ⚠️ **Importante**: NO usar la contraseña normal de Gmail. Siempre usar App Password.

### Paso 4: Ejecutar el proyecto

#### Backend:

```bash
cd backend
npm run dev      # Modo desarrollo con auto-reload
# o
npm start        # Modo producción
```

El backend estará disponible en: `http://localhost:4000`

#### Frontend:

Opción 1 - Usando VS Code Live Server:
- Instalar extensión "Live Server" en VS Code
- Click derecho en `index.html` → "Open with Live Server"

Opción 2 - Usando Python:
```bash
# En el directorio raíz
python -m http.server 5500
```

Opción 3 - Usando Node.js:
```bash
npx serve .
```

El frontend estará disponible en: `http://127.0.0.1:5500`

---

## 📡 Endpoints de la API

### Públicos

#### `GET /api/health`
Verifica el estado del servicio.

**Respuesta:**
```json
{
  "ok": true,
  "service": "secretaria-adicciones-backend"
}
```

#### `POST /api/contact`
Envía una consulta desde el formulario de contacto.

**Body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "dni": "12345678",
  "phone": "3814123456",
  "reason": "Información",
  "message": "Necesito información sobre centros de atención..."
}
```

**Respuesta exitosa (201):**
```json
{
  "ok": true,
  "message": "Consulta enviada correctamente."
}
```

**Respuesta de error (400):**
```json
{
  "error": "El nombre es obligatorio."
}
```

### Protegidos (requieren autenticación)

#### `POST /api/auth/login`
Autentica un usuario administrador y retorna un token JWT.

**Body:**
```json
{
  "email": "admin@secretaria.local",
  "password": "tu-password"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@secretaria.local",
    "role": "admin"
  }
}
```

#### `GET /api/contact-messages`
Lista todas las consultas recibidas (requiere token JWT).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta:**
```json
{
  "items": [
    {
      "id": 1,
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan@example.com",
      "reason": "Información",
      "message": "Necesito información...",
      "status": "nuevo",
      "created_at": "2026-04-14 10:30:00"
    }
  ]
}
```

---

## 🧪 Probar la API

### Ejemplo con cURL:

```bash
# Health check
curl http://localhost:4000/api/health

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@secretaria.local\",\"password\":\"tu-password\"}"

# Enviar contacto
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Juan\",\"lastName\":\"Perez\",\"email\":\"juan@test.com\",\"reason\":\"Consulta\",\"message\":\"Hola\"}"
```

### Ejemplo con JavaScript (desde el frontend):

```javascript
// Enviar consulta
const response = await fetch('http://localhost:4000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    reason: 'Información',
    message: 'Necesito ayuda...'
  })
});

// Autenticación
const { token } = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@secretaria.local',
    password: 'tu-password'
  })
}).then(res => res.json());

// Consultar mensajes
const messages = await fetch('http://localhost:4000/api/contact-messages', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json());
```

---

## 🌐 Despliegue en Producción

### Opción 1: Render (Recomendado)

1. Crear cuenta en https://render.com
2. Click en "New +" → "Web Service"
3. Conectar tu repositorio de GitHub
4. Configurar:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Health Check Path**: `/api/health`
5. Agregar variables de entorno en el panel de Render
6. Deploy!

### Opción 2: Railway

1. Ir a https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Configurar variables en "Variables" tab
4. Railway detecta automáticamente Node.js

### Opción 3: VPS propio

```bash
# Instalar Node.js y PM2
npm install -g pm2

# Iniciar aplicación
cd backend
npm install --production
pm2 start src/server.js --name secretaria-backend

# Configurar Nginx como reverse proxy
# Configurar SSL con Let's Encrypt
```

---

## 🔒 Seguridad

### Mejores prácticas implementadas:

- ✅ **Credenciales nunca expuestas en el frontend**
- ✅ **Hash de contraseñas** con bcrypt (12 rounds)
- ✅ **JWT con expiración** (8 horas)
- ✅ **Validación de datos** en todos los endpoints
- ✅ **CORS restringido** a un origen específico
- ✅ **SQL injection protegido** (consultas parametrizadas)
- ✅ **Sanitización de HTML** en emails

### Recomendaciones para producción:

- Usar HTTPS siempre
- Rotar `JWT_SECRET` periódamente
- Actualizar dependencias regularmente
- Configurar rate limiting (opcional)
- Usar variables de entorno, nunca hardcodear secrets

---

## 📊 Base de Datos

### Tabla: `users`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| email | TEXT | Unique, not null |
| password_hash | TEXT | Hashed with bcrypt |
| role | TEXT | Default: 'admin' |
| created_at | TEXT | Timestamp |

### Tabla: `contact_messages`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| first_name | TEXT | Not null |
| last_name | TEXT | Not null |
| dni | TEXT | Optional (7-8 digits) |
| phone | TEXT | Optional |
| email | TEXT | Not null, validated |
| reason | TEXT | Not null |
| message | TEXT | Optional |
| source | TEXT | Default: 'website' |
| status | TEXT | Default: 'nuevo' |
| created_at | TEXT | Timestamp |

---

## 📝 Flujo de Contacto

1. Usuario completa formulario en `index.html`
2. Frontend valida datos localmente
3. Frontend envía POST a `/api/contact`
4. Backend valida y sanitiza datos
5. Backend guarda consulta en SQLite
6. Backend envía email a `jptoledo1302@gmail.com`
7. Backend retorna confirmación al frontend
8. Frontend muestra mensaje de éxito

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crear branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto es parte del servicio público de la Secretaría de Políticas Integrales sobre Adicciones de Tucumán.

---

## 📞 Contacto

- **Email**: jptoledo1302@gmail.com
- **Repositorio**: https://github.com/jotapeeeeeeee/Secretaria-Adicciones
- **Provincia**: Tucumán, Argentina

---

## 🙏 Agradecimientos

- Gobierno de la Provincia de Tucumán
- Ministerio de Salud Pública
- Secretaría de Gestión Sanitaria
- Secretaría de Políticas Integrales sobre Adicciones

---

**Desarrollado con ❤️ para la comunidad de Tucumán**
