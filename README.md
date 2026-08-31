# RiwiMediCare Plus API

REST API developed to manage medication and medical supply requests between clinics and warehouses.

The system allows the management of clinics, medications, warehouses, and supply requests, applying JWT authentication, role-based access control, and business validations.

---

## Justification

RiwiMediCare Plus needs to centralize and automate the supply request process carried out by its clinics and care centers.

Previously, this process was handled through emails and spreadsheets, which could lead to information loss, inventory errors, delays in request approvals, and poor traceability.

For this reason, a REST API was developed to manage the following in a structured way:

- Users and authentication.
- Clinics.
- Warehouses.
- Medications.
- Available inventory.
- Supply requests.
- Request statuses.
- Request history.

The application aims to ensure data integrity through business validations, JWT authentication, role-based authorization, and data persistence using PostgreSQL.

---

# Technologies Used

The project was developed using:

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

# Project Architecture

The backend is organized using a layered architecture with separation of responsibilities.

The general flow of a request is:

```text
Client
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

This separation keeps the code organized, makes maintenance easier, and prevents different responsibilities from being mixed within the same file.

---

## Folder Structure

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

# What Does Each Layer Do?

### Routes

They define the endpoints available in the API.

They also indicate which middlewares must run before reaching the controller.

Example:

```text
POST /api/auth/login
GET  /api/clinics
POST /api/requests
```

---

### Middlewares

They intercept requests before they reach the controller.

They are mainly used to:

- Validate JWTs.
- Verify authentication.
- Verify roles.
- Handle errors.
- Protect resources.

---

### Controllers

Controllers handle HTTP communication.

Their main responsibilities are:

- Retrieve information from `req`.
- Call the corresponding service.
- Return the HTTP response.
- Define the corresponding status code.

Controllers do not directly contain database queries.

---

### Services

They contain the application's business logic.

For example:

- Verify that a clinic exists.
- Validate medication availability.
- Prevent quantities less than or equal to zero.
- Validate request statuses.
- Prevent duplicate clinics based on their NIT.

This layer connects the controllers with the repositories.

---

### Repositories

They are responsible for database access.

Operations are performed here through Sequelize, such as:

```text
findAll
findByPk
findOne
create
update
destroy
```

This keeps database queries separate from business logic.

---

### Models

They represent PostgreSQL tables through Sequelize.

They define:

- Columns.
- Data types.
- Primary keys.
- Foreign keys.
- Relationships.
- Constraints.

---

### DTOs

DTOs (Data Transfer Objects) define the structure of the data that enters or leaves certain operations.

They help control what information the application receives and what information is returned to the client.

For example, a user response must not expose the user's password.

---

# Authentication and Authorization

The application uses JSON Web Token (JWT).

The authentication flow is:

```text
User
   ↓
Login
   ↓
Credential validation
   ↓
JWT generation
   ↓
Client receives token
   ↓
Authorization: Bearer TOKEN
   ↓
Authentication middleware
   ↓
Endpoint access
```

There are two roles:

### ADMIN

The administrator can manage the application's administrative resources, including:

- Clinics.
- Warehouses.
- Medications.
- Requests.

### USER / Request Manager

The manager can work with features related to supply requests according to the permissions defined in the routes.

Protected routes require a valid JWT.

---

# Business Rules

The application implements validations to protect data integrity.

The main rules include:

- A clinic must exist before it can be used in a request.
- A medication must exist.
- Two clinics cannot be registered with the same NIT.
- The requested quantity must be greater than zero.
- The warehouse must have sufficient inventory.
- A request can only use allowed statuses.
- Protected endpoints require authentication.
- Administrative endpoints require the corresponding role.

---

# Installation

## Requirements

To run the project locally, you need:

- Node.js 18 or higher.
- npm.
- PostgreSQL.

Optionally:

- Docker.
- Docker Compose.

---

## 1. Clone the Repository

```bash
git clone [REPOSITORY_URL]
```

Enter the project directory:

```bash
cd [PROJECT_NAME]
```

---

## 2. Install Dependencies

```bash
npm install
```

---

# Environment Variables

The project uses environment variables to store application configuration and connection credentials.

There is a file:

```text
.env.example
```

that serves as a reference.

Create:

```text
.env
```

Example:

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

> Real credentials must not be stored in Git. The `.env` file must remain inside `.gitignore`.

---

# Development Mode

After installing the dependencies and configuring `.env`:

```bash
npm run dev
```

The API will be available by default at:

```text
http://localhost:3000
```

---

# Compile TypeScript

To verify that the project compiles correctly:

```bash
npm run build
```

This generates the compiled JavaScript version of the project.

To run the compiled version:

```bash
npm start
```

---

# Running with Docker

The project also includes:

```text
Dockerfile
docker-compose.yml
```

Docker Compose starts:

```text
┌───────────────────┐
│       API         │
│     Node.js       │
│      :3000        │
└─────────┬─────────┘
          │
          │ Docker Network
          ↓
┌───────────────────┐
│    PostgreSQL     │
│      :5432        │
└───────────────────┘
```

To build and start the containers:

```bash
docker compose up -d --build
```

Check the status:

```bash
docker compose ps
```

View the logs:

```bash
docker compose logs -f
```

Stop the containers:

```bash
docker compose down
```

To also remove the volumes:

```bash
docker compose down -v
```

---

# Seeders

The project includes seeders to load the initial information required for testing.

The main file is located at:

```text
src/database/seeders/seed.ts
```

To run the seeder:

```bash
npm run seed
```

The seeders allow initial information such as users and other data required to test the application to be loaded.

> If the implementation includes the JSON upload endpoint using Multer requested by the assignment, also document the route, the `multipart/form-data` field name, and an execution example here.

---

# Swagger

Endpoint documentation is available through Swagger UI.

With the application running:

```text
http://localhost:3000/api/docs
```

From Swagger, you can view:

- HTTP methods.
- Routes.
- Parameters.
- Request Body.
- Responses.
- HTTP status codes.
- Protected endpoints.
- Schemas used by the API.

To test protected routes, log in, copy the generated JWT, and use Swagger's **Authorize** option.

---

# API Testing Flow

First, start the application:

```bash
docker compose up -d --build
```

or:

```bash
npm run dev
```

Then:

```text
1. Open Swagger.
        ↓
2. Register a user.
        ↓
3. Log in.
        ↓
4. Get the JWT.
        ↓
5. Click "Authorize".
        ↓
6. Enter the token.
        ↓
7. Test the protected endpoints.
```

---

# Tests

To run the unit tests:

```bash
npm test
```

To generate the coverage report:

```bash
npm test -- --coverage
```

The report allows you to check the percentage of code covered by tests.

---

# GitFlow

A GitFlow-based strategy is used for development.

The main branches are:

```text
main
  ↑
develop
  ↑
feature/*
```

### `main`

Contains the stable versions of the project.

### `develop`

Contains the features integrated during development.

### `feature/*`

Each new feature is developed independently.

Examples:

```text
feature/admin
feature/Request-Manager
```

Once a feature is completed, it is integrated back into `develop`.

---

# Conventional Commits

Commits follow a descriptive structure.

Examples:

```bash
git commit -m "feat(admin): implement clinic, medicine and warehouse modules"

git commit -m "feat(request): implement request management module"

git commit -m "feat(seed): add initial database seeder"

git commit -m "fix(auth): validate JWT payload"

git commit -m "docs: add project documentation"
```

The main types used are:

```text
feat     New feature
fix      Bug fix
docs     Documentation
test     Tests
refactor Refactoring
chore    Configuration or maintenance
```

---

# Security

The application implements different mechanisms to protect its resources:

- Passwords stored using hashes.
- JWT authentication.
- Authentication middleware.
- Role-based authorization middleware.
- Sensitive variables stored in `.env`.
- Validations before executing operations.
- Centralized error handling.
- Separation between HTTP logic, business logic, and persistence.

---

# Architecture Objective

The architecture is designed so that each component has a specific responsibility.

Instead of placing all logic directly in a route:

```text
Route → Database
```

the application uses:

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

This makes the project:

- More organized.
- Easier to understand.
- Easier to maintain.
- Easier to test.
- Scalable.
- Reusable.

---

# Project Status

Backend developed as a solution for the Node.js module performance assessment.

The solution implements a REST API using a layered architecture, JWT authentication, role-based authorization, Sequelize as the ORM, and PostgreSQL as the persistence system.

---

## Author

**Coder:** Daniel Mendoza

Riwi - Node.js Performance Assessment
