# RiwiMediCare Plus API

API REST desarrollada para gestionar solicitudes de abastecimiento de medicamentos e insumos médicos entre clínicas y almacenes.

El sistema permite administrar clínicas, medicamentos, almacenes y solicitudes de abastecimiento, aplicando autenticación mediante JWT, control de acceso por roles y validaciones de negocio.

---

## Información del proyecto

**Coder:** [TU NOMBRE]  
**Clan:** [TU CLAN]  
**Repositorio:** [URL DEL REPOSITORIO DE GITHUB]

---

## Justificación

RiwiMediCare Plus requiere centralizar y automatizar el proceso de solicitudes de abastecimiento realizadas por sus clínicas y centros de atención.

Anteriormente, este proceso se realizaba mediante correos electrónicos y hojas de cálculo, lo que podía ocasionar pérdida de información, errores de inventario, retrasos en la aprobación de solicitudes y poca trazabilidad.

Por esta razón se desarrolló una API REST que permite gestionar de manera estructurada:

- Usuarios y autenticación.
- Clínicas.
- Almacenes.
- Medicamentos.
- Inventario disponible.
- Solicitudes de abastecimiento.
- Estados de las solicitudes.
- Historial de solicitudes.

La aplicación busca garantizar la integridad de la información mediante validaciones de negocio, autenticación JWT, autorización por roles y persistencia de datos utilizando PostgreSQL.

---

# Tecnologías utilizadas

El proyecto fue desarrollado utilizando:

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Token (JWT)
- bcryptjs
- Swagger 
- Docker
- Docker Compose
- Git
- GitFlow

---

# Arquitectura del proyecto

El backend está organizado utilizando una arquitectura por capas con separación de responsabilidades.

El flujo general de una petición es:

```text
Cliente
   ↓
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models
   ↓
Sequelize
   ↓
PostgreSQL
```

Esta separación permite mantener el código organizado, facilitar su mantenimiento y evitar que responsabilidades diferentes se mezclen dentro de un mismo archivo.

---

## Estructura de carpetas

```text
src/
│
├── config/
│   ├── database.ts
│   ├── env.ts
│   └── swagger.ts
│
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── clinic.controller.ts
│   ├── medicine.controller.ts
│   ├── warehouse.controller.ts
│   └── request.controller.ts
│
├── database/
│   └── seeders/
│       └── seed.ts
│
├── dtos/
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   └── error.middleware.ts
│
├── models/
│
├── repositories/
│   ├── user.repository.ts
│   ├── clinic.repository.ts
│   ├── medicine.repository.ts
│   ├── warehouse.repository.ts
│   └── request.repository.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── clinic.routes.ts
│   ├── medicine.routes.ts
│   ├── warehouse.routes.ts
│   ├── request.routes.ts
│   └── index.ts
│
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── clinic.service.ts
│   ├── medicine.service.ts
│   ├── warehouse.service.ts
│   └── request.service.ts
│
├── types/
├── utils/
├── index.ts
└── server.ts
```

---

# ¿Qué hace cada capa?

### Routes

Definen los endpoints disponibles en la API.

También indican qué middlewares deben ejecutarse antes de llegar al controlador.

Ejemplo:

```text
POST /api/auth/login
GET  /api/clinics
POST /api/requests
```

---

### Middlewares

Interceptan las peticiones antes de que lleguen al controlador.

Son utilizados principalmente para:

- Validar JWT.
- Verificar autenticación.
- Verificar roles.
- Manejar errores.
- Proteger recursos.

---

### Controllers

Los controladores manejan la comunicación HTTP.

Sus principales responsabilidades son:

- Obtener información de `req`.
- Llamar al servicio correspondiente.
- Devolver la respuesta HTTP.
- Definir el código de estado correspondiente.

Los controladores no contienen directamente consultas a la base de datos.

---

### Services

Contienen la lógica de negocio de la aplicación.

Por ejemplo:

- Verificar que una clínica exista.
- Validar la disponibilidad de medicamentos.
- Evitar cantidades menores o iguales a cero.
- Validar los estados de una solicitud.
- Evitar clínicas duplicadas mediante su NIT.

Esta capa comunica los controllers con los repositories.

---

### Repositories

Son responsables del acceso a la base de datos.

Aquí se realizan operaciones mediante Sequelize como:

```text
findAll
findByPk
findOne
create
update
destroy
```

Esto permite mantener las consultas de base de datos separadas de la lógica de negocio.

---

### Models

Representan las tablas de PostgreSQL mediante Sequelize.

Aquí se definen:

- Columnas.
- Tipos de datos.
- Llaves primarias.
- Llaves foráneas.
- Relaciones.
- Restricciones.

---

### DTOs

Los DTOs (Data Transfer Objects) definen la estructura de los datos que entran o salen de determinadas operaciones.

Permiten controlar qué información recibe la aplicación y qué información se devuelve al cliente.

Por ejemplo, una respuesta de usuario no debe exponer su contraseña.

---

# Autenticación y autorización

La aplicación utiliza JSON Web Token (JWT).

El flujo de autenticación es:

```text
Usuario
   ↓
Login
   ↓
Validación de credenciales
   ↓
Generación del JWT
   ↓
Cliente recibe token
   ↓
Authorization: Bearer TOKEN
   ↓
Middleware de autenticación
   ↓
Acceso al endpoint
```

Existen dos roles:

### ADMIN

El administrador puede gestionar los recursos administrativos de la aplicación, incluyendo:

- Clínicas.
- Almacenes.
- Medicamentos.
- Solicitudes.

### USER / Gestor de Solicitudes

El gestor puede trabajar con las funcionalidades relacionadas con solicitudes de abastecimiento según los permisos definidos en las rutas.

Las rutas protegidas requieren un JWT válido.

---

# Reglas de negocio

La aplicación implementa validaciones para proteger la integridad de la información.

Entre las principales reglas se encuentran:

- Una clínica debe existir antes de utilizarse en una solicitud.
- Un medicamento debe existir.
- No se pueden registrar dos clínicas con el mismo NIT.
- La cantidad solicitada debe ser mayor a cero.
- El almacén debe tener inventario suficiente.
- Una solicitud solamente puede utilizar estados permitidos.
- Los endpoints protegidos requieren autenticación.
- Los endpoints administrativos requieren el rol correspondiente.

---

# Instalación

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- Node.js 18 o superior.
- npm.
- PostgreSQL.

Opcionalmente:

- Docker.
- Docker Compose.

---

## 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
```

Entrar al proyecto:

```bash
cd [NOMBRE_DEL_PROYECTO]
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

El proyecto utiliza variables de entorno para almacenar la configuración de la aplicación y las credenciales de conexión.

Existe un archivo:

```text
.env.example
```

que sirve como referencia.

Crear:

```text
.env
```

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=riwimedicare
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d
```

> Las credenciales reales no deben almacenarse en Git. El archivo `.env` debe permanecer dentro de `.gitignore`.

---

# Ejecución en desarrollo

Después de instalar las dependencias y configurar `.env`:

```bash
npm run dev
```

La API estará disponible por defecto en:

```text
http://localhost:3000
```

---

# Compilar TypeScript

Para comprobar que el proyecto compile correctamente:

```bash
npm run build
```

Esto genera la versión JavaScript compilada del proyecto.

Para ejecutar la versión compilada:

```bash
npm start
```

---

# Ejecución con Docker

El proyecto también incluye:

```text
Dockerfile
docker-compose.yml
```

Docker Compose levanta:

```text
┌───────────────────┐
│       API         │
│     Node.js       │
│      :3000        │
└─────────┬─────────┘
          │
          │ Red Docker
          ↓
┌───────────────────┐
│    PostgreSQL     │
│      :5432        │
└───────────────────┘
```

Para construir e iniciar los contenedores:

```bash
docker compose up -d --build
```

Comprobar el estado:

```bash
docker compose ps
```

Ver los logs:

```bash
docker compose logs -f
```

Detener los contenedores:

```bash
docker compose down
```

Para eliminar también los volúmenes:

```bash
docker compose down -v
```

---

# Seeders

El proyecto incluye seeders para cargar información inicial necesaria para realizar pruebas.

El archivo principal se encuentra en:

```text
src/database/seeders/seed.ts
```

Para ejecutar el seeder:

```bash
npm run seed
```

Los seeders permiten cargar información inicial como usuarios y demás datos requeridos para probar la aplicación.

> Si la implementación incluye el endpoint de carga JSON mediante Multer solicitado por el enunciado, documentar aquí también la ruta, el nombre del campo `multipart/form-data` y un ejemplo de ejecución.

---

# Swagger

La documentación de los endpoints se encuentra disponible mediante Swagger UI.

Con la aplicación ejecutándose:

```text
http://localhost:3000/api/docs
```

Desde Swagger se pueden consultar:

- Métodos HTTP.
- Rutas.
- Parámetros.
- Request Body.
- Respuestas.
- Códigos HTTP.
- Endpoints protegidos.
- Esquemas utilizados por la API.

Para probar rutas protegidas se debe iniciar sesión, copiar el JWT generado y utilizar la opción **Authorize** de Swagger.

---

# Flujo para probar la API

Primero iniciar la aplicación:

```bash
docker compose up -d --build
```

o:

```bash
npm run dev
```

Después:

```text
1. Abrir Swagger.
        ↓
2. Registrar un usuario.
        ↓
3. Iniciar sesión.
        ↓
4. Obtener el JWT.
        ↓
5. Presionar "Authorize".
        ↓
6. Introducir el token.
        ↓
7. Probar los endpoints protegidos.
```

---

# Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Para generar el reporte de cobertura:

```bash
npm test -- --coverage
```

El reporte permite comprobar el porcentaje de código cubierto por las pruebas.

---

# GitFlow

Para el desarrollo se utiliza una estrategia basada en GitFlow.

Las ramas principales son:

```text
main
  ↑
develop
  ↑
feature/*
```

### `main`

Contiene las versiones estables del proyecto.

### `develop`

Contiene las funcionalidades integradas durante el desarrollo.

### `feature/*`

Cada nueva funcionalidad se desarrolla de manera independiente.

Ejemplos:

```text
feature/admin
feature/Request-Manager
```

Una vez terminada una funcionalidad, se integra nuevamente en `develop`.

---

# Conventional Commits

Los commits siguen una estructura descriptiva.

Ejemplos:

```bash
git commit -m "feat(admin): implement clinic, medicine and warehouse modules"

git commit -m "feat(request): implement request management module"

git commit -m "feat(seed): add initial database seeder"

git commit -m "fix(auth): validate JWT payload"

git commit -m "docs: add project documentation"
```

Los principales tipos utilizados son:

```text
feat     Nueva funcionalidad
fix      Corrección de error
docs     Documentación
test     Pruebas
refactor Refactorización
chore    Configuración o mantenimiento
```

---

# Seguridad

La aplicación implementa diferentes mecanismos para proteger los recursos:

- Contraseñas almacenadas mediante hash.
- Autenticación mediante JWT.
- Middleware de autenticación.
- Middleware de autorización por roles.
- Variables sensibles mediante `.env`.
- Validaciones antes de ejecutar operaciones.
- Manejo centralizado de errores.
- Separación entre lógica HTTP, negocio y persistencia.

---

# Objetivo de la arquitectura

La arquitectura utilizada busca que cada componente tenga una responsabilidad específica.

En lugar de tener toda la lógica en una ruta:

```text
Route → Base de datos
```

se utiliza:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
Database
```

Esto permite que el proyecto sea más:

- Organizado.
- Fácil de entender.
- Fácil de mantener.
- Fácil de probar.
- Escalable.
- Reutilizable.

---

# Estado del proyecto

Backend desarrollado como solución para la prueba de desempeño del módulo Node.js.

La solución implementa una API REST utilizando una arquitectura por capas, autenticación JWT, autorización mediante roles, Sequelize como ORM y PostgreSQL como sistema de persistencia.

---

## Autor

**Coder:** Daniel Mendoza  

Riwi - Prueba de Desempeño Node.js