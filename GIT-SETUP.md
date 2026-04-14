# 🚀 Configuración Inicial y Push a GitHub

## Paso 1: Instalar Git

### Descargar Git
1. Ir a: https://git-scm.com/download/win
2. Descargar el instalador
3. Ejecutar con opciones por defecto (todas las opciones estándar están bien)
4. **IMPORTANTE**: Cerrar y reabrir la terminal o VS Code después de instalar

### Verificar Instalación
Abrir una nueva terminal (cmd o PowerShell) y ejecutar:
```bash
git --version
```

Debería mostrar algo como: `git version 2.45.0`

---

## Paso 2: Configurar Git (Primera vez)

### Configurar tu identidad
```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@example.com"
```

**Nota**: Usá el email asociado a tu cuenta de GitHub.

---

## Paso 3: Inicializar el Repositorio

### Navegar al proyecto
```bash
cd "C:\Users\tomas\OneDrive\Desktop\Secretaria-Adicciones-main"
```

### Inicializar Git
```bash
git init
```

---

## Paso 4: Conectar con GitHub

### Agregar repositorio remoto
```bash
git remote add origin https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git
```

### Verificar conexión
```bash
git remote -v
```

Debería mostrar:
```
origin  https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git (fetch)
origin  https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git (push)
```

---

## Paso 5: Primer Commit

### Agregar todos los archivos
```bash
git add .
```

### Ver qué archivos se agregaron
```bash
git status
```

### Crear commit inicial
```bash
git commit -m "feat: initial commit - Secretaria de Adicciones website

- Frontend estático con HTML/CSS responsive design
- Backend Node.js con Express + SQLite
- Sistema de consultas por email con Nodemailer
- Autenticación JWT para panel administrativo
- Configuración de despliegue en Render
- Documentación completa (README, DEPLOYMENT)
- Variables de entorno configurables por ambiente

Proyecto para la Secretaría de Políticas Integrales 
sobre Adicciones - Tucumán, Argentina"
```

---

## Paso 6: Push a GitHub

### Enviar al repositorio remoto

**Si tu branch principal se llama `main`:**
```bash
git push -u origin main
```

**Si tu branch principal se llama `master`:**
```bash
git push -u origin master
```

### Si pide autenticación

GitHub ya no permite autenticación con contraseña. Tenés dos opciones:

#### Opción A: Usar GitHub Personal Access Token (PAT)

1. Ir a: https://github.com/settings/tokens
2. Click en **"Generate new token (classic)"**
3. Darle un nombre (ej: "Mi Laptop")
4. Seleccionar scopes: al menos `repo` (todo lo de repo)
5. Click en **Generate token**
6. **COPIAR EL TOKEN** (solo se muestra una vez!)
7. Usar ese token como contraseña cuando Git lo pida

#### Opción B: Usar GitHub Desktop (Más fácil)

1. Descargar: https://desktop.github.com
2. Instalar y loguearte con tu cuenta de GitHub
3. GitHub Desktop maneja la autenticación automáticamente
4. Podés hacer push desde la interfaz gráfica

#### Opción C: Configurar SSH (Recomendado para uso frecuente)

1. Seguir guía: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
2. Una vez configurado, no pedirá autenticación cada vez

---

## Paso 7: Verificar en GitHub

1. Ir a: https://github.com/jotapeeeeeeee/Secretaria-Adicciones
2. Verificar que todos los archivos están presentes
3. Verificar que el commit aparece en el historial

---

## Comandos Útiles para el Futuro

### Ver estado de cambios
```bash
git status
```

### Ver diferencias
```bash
git diff
```

### Agregar y commitear cambios
```bash
git add .
git commit -m "descripción de los cambios"
git push
```

### Crear un branch nuevo
```bash
git checkout -b nombre-del-branch
```

### Volver al branch principal
```bash
git checkout main
```

### Ver historial de commits
```bash
git log --oneline
```

---

## Problemas Comunes

### Error: "remote origin already exists"
```bash
# Eliminar y volver a agregar
git remote remove origin
git remote add origin https://github.com/jotapeeeeeeee/Secretaria-Adicciones.git
```

### Error: "Updates were rejected because the tip of your current branch is behind"
```bash
# Forzar push (solo si es el primer commit)
git push -f origin main

# O hacer pull primero
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied (publickey)"
- Significa que necesitás configurar autenticación
- Usar PAT (Opción A arriba) o configurar SSH (Opción C)

---

## Próximos Pasos

Después de hacer push:

1. ✅ Configurar GitHub Pages para el frontend
2. ✅ Desplegar backend en Render
3. ✅ Configurar variables de entorno
4. ✅ Conectar frontend con backend

Seguir la guía en `DEPLOYMENT.md` para los pasos completos.

---

**Creado: 14 de abril de 2026**
