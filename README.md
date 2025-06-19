

# MiApp Segura - Proyecto DevSecOps

[![Pipeline](https://github.com/Sylsk/Taller3_Ciber/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Sylsk/Taller3_Ciber/actions/workflows/pipeline.yml)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Sylsk_Taller3_Ciber\&metric=alert_status)](https://sonarcloud.io/dashboard?id=Sylsk_Taller3_Ciber)

Aplicación web de notas personales con enfoque DevSecOps: autenticación, creación, visualización y eliminación de notas, junto a un pipeline automatizado de CI/CD que incluye análisis de calidad y seguridad.

---

## Características

* **Login básico** (usuario: `admin`, contraseña: `123456`)
* **CRUD de notas**: crear, ver y eliminar notas guardadas en archivo JSON
* **Frontend**: React con React Router, `localStorage` para sesión persistente
* **Backend**: Node.js + Express (almacenamiento en `backend/data/notas.json`)
* **Variables de entorno**: `.env` en `frontend/` (`REACT_APP_API`)
* **Docker & Docker Compose**: contenedorización de frontend y backend
* **Análisis de código**: ESLint (backend)
* **Análisis estático**: CodeQL (workflow separado)
* **Escaneo de contenedores**: Trivy
* **Análisis de calidad**: SonarCloud

---

## 📦 Instalación local

### Requisitos

* Node.js v18+
* npm

### Clonar y ejecutar

```bash
# Clonar
git clone https://github.com/Sylsk/Taller3_Ciber.git
cd Taller3_Ciber

# Backend
cd backend
npm install
npm run lint          # ESLint
node app.js          # API en http://localhost:5555

# Frontend (en nueva terminal)
cd ../frontend
npm install
npm start            # React en http://localhost:3000
```

*El frontend leerá la API en `http://localhost:5555` según `REACT_APP_API` definido en `frontend/.env`.*

---

##  Uso con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend** API: [http://localhost:5555](http://localhost:5555)

Para detener: `CTRL+C` y luego `docker-compose down`

---

## 🔧 Pipeline CI/CD

Este repositorio incluye un workflow DevSecOps (`.github/workflows/pipeline.yml`) que:

1. Clona el código
2. Instala dependencias del backend
3. Ejecuta **ESLint** en el backend
4. Construye la imagen Docker del backend
5. Escanea la imagen con **Trivy**
6. Realiza análisis con **SonarCloud** usando `sonar-project.properties`
7. (Workflow separado `codeql.yml`) Ejecuta **CodeQL** para vulnerabilidades

---

## Análisis de Seguridad

* **ESLint**: detecta errores de estilo y posibles bug patterns en JavaScript
* **Trivy**: detecta vulnerabilidades en la imagen `miapp-backend`
* **SonarCloud**: métricas de bugs, vulnerabilidades, code smells y duplicaciones
* **CodeQL**: análisis estático avanzado reportado en GitHub Security
* **Dependabot** y **Secret scanning**: opcionales, recomendados para más seguridad

---

## Estructura del Proyecto

```
Taller3_Ciber/
├── backend/                # API Express + ESLint
│   ├── data/notas.json
│   ├── app.js
│   ├── package.json
│   └── eslint.config.mjs
├── frontend/               # App React
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── index.css
│   │   └── App.js
│   ├── .env                # REACT_APP_API=http://localhost:5555
│   └── package.json
├── .github/
│   └── workflows/
│       ├── pipeline.yml    # ESLint, Docker, Trivy, SonarCloud
│       └── codeql.yml      # CodeQL analysis
├── docker-compose.yml
├── sonar-project.properties
└── README.md
```

