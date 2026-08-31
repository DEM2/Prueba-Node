import { sequelize } from "./config/database";
import { env } from "./config/env";
//import { initModels } from "./models";
import { createServer } from "./server";

const bootstrap = async () => {
  try {
    //initModels();
    await sequelize.authenticate();

    // Para la prueba permite levantar rápido el esquema.
    // En producción real, reemplazar por migraciones.
    await sequelize.sync();

    const app = createServer();
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}/api`);
      console.log(`Swagger on http://localhost:${env.port}/api/docs`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

void bootstrap();
