# EduGo Web Application

Edugo is a web app for viewing metrics and reports received from the mobile application.

## Features

- View metrics and analytics from the mobile app
- Access detailed reports
- Responsive and user-friendly interface

## Tech Stack

- Angular
- TypeScript
- JavaScript
- npm

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```bash
npm install
```
### Ejecución en desarrollo

```bash
npm start
```

Esto iniciará la aplicación en modo desarrollo. Por defecto, estará disponible en `http://localhost:4200/`.

### Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## Estructura del proyecto

- `src/` — Código fuente de la aplicación
- `src/environments/` — Archivos de configuración de entorno
- `README.md` — Este archivo

## Configuración de entornos

El proyecto utiliza archivos de entorno para diferenciar entre desarrollo y producción:

- `environment.ts` — Configuración por defecto
- `environment.development.ts` — Configuración para desarrollo

## Scripts útiles

- `npm start` — Inicia la app en modo desarrollo
- `npm run build` — Compila la app para producción
- `npm test` — Ejecuta los tests unitarios


## Licencia

Este proyecto está bajo la licencia MIT.
