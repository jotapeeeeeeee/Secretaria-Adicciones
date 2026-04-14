# 🚀 Guía Completa de Despliegue

Esta guía documenta **paso a paso** el proceso completo de despliegue de la aplicación de la Secretaría de Adicciones, desde la configuración local hasta la publicación en internet.

---

## 📋 Tabla de Contenidos

1. [Preparación del Entorno](#1-preparación-del-entorno)
2. [Configuración de Git](#2-configuración-de-git)
3. [Configuración de Gmail SMTP](#3-configuración-de-gmail-smtp)
4. [Despliegue del Backend en Render](#4-despliegue-del-backend-en-render)
5. [Despliegue del Frontend](#5-despliegue-del-frontend)
6. [Conectar Frontend con Backend](#6-conectar-frontend-con-backend)
7. [Verificación y Pruebas](#7-verificación-y-pruebas)
8. [Mantenimiento](#8-mantenimiento)

---

## 1. Preparación del Entorno

### 1.1 Instalar Git

**Windows:**
1. Descargar desde: https://git-scm.com/download/win
2. Ejecutar el instalador (opciones por defecto están bien)
3. Reiniciar la terminal/VS Code después de instalar

**Verificar instalación:**
```bash
git --version
# Debería mostrar: git version 2.x.x
```

### 1.2 Instalar Node.js

**Si aún no lo tienes:**
1. Descargar desde: https://nodejs.org (versión LTS)
2. Instalar con opciones por defecto

**Verificar instalación:**
```bash
node --version
npm --version
```

### 1.3 Estructura del Proyecto

Tu proyecto tiene esta estructura:
```
Secretaria-Adicciones/
├── index.html           ← Frontend (sitio estático)
├── backend/             ← Backend (servidor Node.js)
│   ├── src/
│   ├── package.json
│   └── .env.example
├── render.yaml          ← Configuración para Render
└── README.md
```

---

## 2. Configuración de Git

### 2.1 Inicializar Repositorio Local

```bash
# Navegar al directorio del proyecto
cd C:\Users\tomas\OneDrive\Desktop\Secretaria-Adicciones-main

# Inicializar Git
git init
```

### 2.2 Configurar tu identidad

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### 2.3 Conectar con GitHub

```bash
# Agregar el repositorio remoto
git remote add origin https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git

# Verificar que se agregó correctamente
git remote -v
```

### 2.4 Primer Commit

```bash
# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "feat: initial commit - Secretaria de Adicciones website

- Frontend estático con HTML/CSS responsive
- Backend Node.js con Express + SQLite
- Sistema de consultas por email
- Autenticación JWT para panel admin
- Configuración de despliegue en Render"
```

### 2.5 Push a GitHub

```bash
# Enviar al repositorio remoto
git push -u origin main

# Si tu branch se llama master en vez de main:
# git push -u origin master
```

**Si pide autenticación:**
- Usar GitHub Personal Access Token (PAT) en lugar de contraseña
- Crear PAT en: https://github.com/settings/tokens
- O usar GitHub Desktop / SSH keys

---

## 3. Configuración de Gmail SMTP

Para que las consultas del formulario lleguen a tu correo, necesitas configurar una **App Password** de Gmail.

### 3.1 Activar Verificación en Dos Pasos

1. Ir a tu cuenta de Google: https://myaccount.google.com
2. Ir a **Seguridad**
3. En "Cómo inicias sesión en Google", hacer clic en **Verificación en dos pasos**
4. Seguir los pasos para activarla (requiere teléfono)

### 3.2 Generar App Password

1. Ir a: https://myaccount.google.com/apppasswords
2. Iniciar sesión si lo pide
3. En "Seleccionar la app", elegir **Correo**
4. En "Seleccionar el dispositivo", elegir **Otro (nombre personalizado)**
5. Escribir: `Secretaria Adicciones`
6. Click en **Generar**
7. **Copiar la contraseña de 16 caracteres** que aparece (es algo como: `abcd efgh ijkl mnop`)

### 3.3 Configurar en el Proyecto

Crear/editar el archivo `backend/.env`:

```env
PORT=4000
NODE_ENV=production
FRONTEND_ORIGIN=https://jotapeeeeeeee.github.io

# JWT Secret - GENERAR UNO ÚNICO
# Puedes usar: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=aqui-va-un-secreto-largo-y-aleatorio

# Admin credentials (cambiar estos valores)
ADMIN_EMAIL=admin@secretaria.local
ADMIN_PASSWORD=UnPasswordSeguro123!

# Email configuration
CONTACT_DESTINATION_EMAIL=jptoledo1302@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=jptoledo1302@gmail.com
SMTP_PASS=abcdefg hijklmnop  # Tu App Password (sin espacios)
MAIL_FROM="Secretaria Adicciones <jptoledo1302@gmail.com>"
```

**⚠️ IMPORTANTE:**
- El `SMTP_PASS` debe ser la App Password **sin espacios**
- Nunca compartir este archivo públicamente
- El `.gitignore` ya está configurado para ignorar `.env`

---

## 4. Despliegue del Backend en Render

Render es una plataforma de hosting gratuita que soporta Node.js. El plan gratuito tiene algunas limitaciones (se "duerme" después de 15 min de inactividad), pero es perfecto para este proyecto.

### 4.1 Crear Cuenta en Render

1. Ir a: https://render.com
2. Click en **Get Started**
3. Sign up con GitHub (recomendado) o email
4. Autorizar el acceso a tu repositorio

### 4.2 Crear Web Service

**Opción A: Usando render.yaml (Recomendado)**

1. Una vez logueado, ir a tu dashboard
2. Click en **"New +"** → **"Blueprint"**
3. Conectar tu repositorio `Secretaria-Adicciones`
4. Render detectará automáticamente el archivo `render.yaml`
5. Click en **Apply**

**Opción B: Manual**

1. Click en **"New +"** → **"Web Service"**
2. Conectar repositorio `Secretaria-Adicciones`
3. Configurar:
   - **Name**: `secretaria-adicciones-backend`
   - **Region**: `Frankfurt` o `N. Virginia` (más cerca de Argentina)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 4.3 Configurar Variables de Entorno en Render

En el panel de tu servicio en Render:

1. Ir a la pestaña **Environment**
2. Agregar las siguientes variables:

| Variable | Valor | Notas |
|----------|-------|-------|
| `NODE_ENV` | `production` | |
| `PORT` | `10000` | Render asignará este puerto |
| `FRONTEND_ORIGIN` | `https://jotapeeeeeeee.github.io` | URL del frontend (ajustar después) |
| `JWT_SECRET` | *(generar uno aleatorio)* | Ejecutar: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `ADMIN_EMAIL` | `admin@secretaria.local` | O el que prefieras |
| `ADMIN_PASSWORD` | *(password seguro)* | Cambiar después del primer login |
| `CONTACT_DESTINATION_EMAIL` | `jptoledo1302@gmail.com` | Donde llegan las consultas |
| `SMTP_HOST` | `smtp.gmail.com` | |
| `SMTP_PORT` | `465` | |
| `SMTP_SECURE` | `true` | |
| `SMTP_USER` | `jptoledo1302@gmail.com` | |
| `SMTP_PASS` | *(tu App Password)* | Sin espacios |
| `MAIL_FROM` | `Secretaria Adicciones <jptoledo1302@gmail.com>` | |

### 4.4 Deploy

1. Click en **Apply** o **Deploy**
2. Esperar a que se complete el deploy (1-3 minutos)
3. Render te dará una URL como: `https://secretaria-adicciones-backend-xxxx.onrender.com`

**¡IMPORTANTE!** Copiar esta URL, la necesitarás para el frontend.

### 4.5 Verificar Backend

Visitar: `https://tu-backend-url.onrender.com/api/health`

Deberías ver:
```json
{
  "ok": true,
  "service": "secretaria-adicciones-backend"
}
```

---

## 5. Despliegue del Frontend

### Opción A: GitHub Pages (Recomendado)

#### Paso 1: Configurar GitHub Pages

1. Ir a tu repositorio en GitHub: https://github.com/jotapeeeeeeee/Secretaria-Adicciones
2. Click en **Settings** (arriba a la derecha)
3. En el menú izquierdo, click en **Pages**
4. En **Source**, seleccionar:
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
5. Click en **Save**

#### Paso 2: Esperar el Deploy

GitHub Pages tardará 1-2 minutos en publicar tu sitio.

Tu sitio estará disponible en:
```
https://jotapeeeeeeee.github.io/Secretaria-Adicciones/
```

#### Paso 3: Verificar

Visitar la URL anterior y verificar que:
- ✅ El sitio carga correctamente
- ✅ Los estilos se ven bien
- ✅ La navegación funciona

### Opción B: Netlify

1. Ir a: https://netlify.com
2. Sign up con GitHub
3. "Add new site" → "Import an existing project"
4. Conectar repositorio `Secretaria-Adicciones`
5. Configurar:
   - **Base directory**: (dejar vacío)
   - **Build command**: (dejar vacío, es estático)
   - **Publish directory**: `./` (root)
6. Click en **Deploy**

---

## 6. Conectar Frontend con Backend

### 6.1 Actualizar URL del Backend en index.html

Abrir el archivo `index.html` y buscar esta línea (debería estar cerca del inicio):

```html
<meta name="api-base-url" content="http://localhost:4000">
```

Cambiarla por la URL real de tu backend en Render:

```html
<meta name="api-base-url" content="https://secretaria-adicciones-backend-xxxx.onrender.com">
```

**⚠️ IMPORTANTE:**
- Reemplazar `secretaria-adicciones-backend-xxxx.onrender.com` con tu URL real
- **NO** incluir barra `/` al final
- Mantener el protocolo `https://`

### 6.2 Actualizar FRONTEND_ORIGIN en Render

1. Volver al panel de Render
2. Ir a tu servicio → **Environment**
3. Actualizar `FRONTEND_ORIGIN` con la URL de GitHub Pages:
   ```
   https://jotapeeeeeeee.github.io
   ```
4. Redeploy (se hará automáticamente al cambiar variables)

### 6.3 Commit y Push de los Cambios

```bash
git add index.html
git commit -m "config: update API base URL to production backend"
git push origin main
```

---

## 7. Verificación y Pruebas

### 7.1 Probar el Formulario de Contacto

1. Ir a: `https://jotapeeeeeeee.github.io/Secretaria-Adicciones/`
2. Hacer scroll hasta la sección de contacto
3. Completar el formulario con datos de prueba:
   - Nombre: `Test`
   - Apellido: `Usuario`
   - Email: `test@example.com`
   - Motivo: `Información`
   - Mensaje: `Prueba de funcionamiento`
4. Click en Enviar

**Deberías ver:**
- ✅ Mensaje de confirmación en el frontend
- ✅ Email llegando a `jptoledo1302@gmail.com`

### 7.2 Verificar en la Base de Datos (Opcional)

Si quieres verificar que se guardó en la base de datos:

```bash
# Necesitarás autenticarte primero
curl -X POST https://tu-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@secretaria.local\",\"password\":\"tu-password\"}"

# Usar el token recibido
curl https://tu-backend.onrender.com/api/contact-messages \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 7.3 Checklist Final

- [ ] Backend responde en `/api/health`
- [ ] Frontend cargue desde GitHub Pages
- [ ] Formulario envíe consultas correctamente
- [ ] Emails lleguen a `jptoledo1302@gmail.com`
- [ ] CORS funcione (sin errores en consola del navegador)
- [ ] Login funcione con credenciales de admin
- [ ] `/api/contact-messages` retorne mensajes con autenticación

---

## 8. Mantenimiento

### 8.1 Actualizar el Sitio

Cada vez que hagas cambios:

```bash
# Ver qué archivos cambiaron
git status

# Agregar cambios
git add .

# Crear commit
git commit -m "descripción de los cambios"

# Push a GitHub (actualiza automáticamente GitHub Pages)
git push origin main
```

### 8.2 Redeploy en Render

Render hace redeploy automático cuando:
- Haces push a la branch `main`
- Cambias variables de entorno

Para trigger manual:
1. Ir a Render → Tu servicio
2. Click en **Manual Deploy** → **Deploy latest commit**

### 8.3 Monitoreo

**Render Dashboard:**
- Ver logs en tiempo real
- Ver métricas de uso
- Ver historial de deploys

**GitHub Pages:**
- Ver tráfico en Settings → Pages
- Ver commits y actividad

### 8.4 Backups de la Base de Datos

La base de datos SQLite se guarda en `backend/data/secretaria.db`.

Para hacer backup manual:
1. Conectarte a tu servicio en Render via SSH (plan Pro+)
2. O configurar un script de backup automático

**Alternativa para producción:**
Considerar migrar a PostgreSQL o MySQL si el volumen de consultas crece.

### 8.5 Limitaciones del Plan Gratuito

**Render Free:**
- Servicio se "duerme" tras 15 min de inactividad
- Primera petición tras "despertar" tarda ~30 segundos
- 750 horas/mes de runtime (suficiente para un servicio)
- Base de datos se resetea en redeploy (datos se pierden)

**Solución para datos persistentes:**
- Usar Render PostgreSQL add-on (gratis con límites)
- O migrar a servicio externo (Supabase, Neon, Railway)

---

## 🆝 URLs Finales

Una vez completado todo el despliegue:

| Componente | URL |
|------------|-----|
| **Frontend** | `https://jotapeeeeeeee.github.io/Secretaria-Adicciones/` |
| **Backend API** | `https://tu-backend.onrender.com` |
| **Health Check** | `https://tu-backend.onrender.com/api/health` |
| **Repositorio** | `https://github.com/jotapeeeeeeee/Secretaria-Adicciones` |

---

## 🐛 Solución de Problemas

### El formulario no envía

**Problema:** Error de CORS o la petición falla.

**Solución:**
1. Verificar que `FRONTEND_ORIGIN` en Render coincida exactamente con la URL de GitHub Pages
2. Verificar en el navegador (F12 → Console) si hay errores de CORS
3. Verificar logs en Render Dashboard

### Emails no llegan

**Problema:** Las consultas se guardan pero no llegan emails.

**Solución:**
1. Verificar que `SMTP_PASS` sea la App Password correcta (sin espacios)
2. Verificar que la verificación en dos pasos esté activada
3. Revisar logs en Render para ver errores de SMTP

### GitHub Pages no actualiza

**Problema:** Hice push pero el sitio no cambia.

**Solución:**
1. Esperar 1-2 minutos (puede tardar)
2. Hard refresh en navegador: `Ctrl + Shift + R`
3. Verificar en Settings → Pages que esté bien configurado

### Backend tarda en responder

**Problema:** Las peticiones iniciales son lentas.

**Solución:**
- Esto es normal en el plan gratuito (servicio "duerme")
- Primera petición tras inactividad tarda ~30s
- Peticiones siguientes son rápidas
- Considerar upgrade a plan pago si necesitas mejor disponibilidad

---

## 📞 Soporte

Si tienes problemas:

1. Revisar los logs en Render Dashboard
2. Verificar la consola del navegador (F12)
3. Revisar este documento paso a paso
4. Contactar a: jptoledo1302@gmail.com

---

**Documento creado el 14 de abril de 2026**  
**Versión: 1.0**  
**Autor: Secretaría de Adicciones - Tucumán**
