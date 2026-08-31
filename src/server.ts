import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger-doc/swagger";
import { apiRouter } from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

export const createServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
