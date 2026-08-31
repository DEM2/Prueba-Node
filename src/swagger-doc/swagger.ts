import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../config/env";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Backend Exam Template API",
      version: "1.0.0",
      description: "Plantilla adaptable para prueba de desempeño Backend."
    },
    servers: [
      {
        url: `http://localhost:${env.port}/api`,
        description: "Local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Daniel" },
            email: { type: "string", example: "daniel@example.com" },
            role: { type: "string", enum: ["ADMIN", "USER"], example: "USER" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"]
});
