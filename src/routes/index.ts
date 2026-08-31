import { Router } from "express";
import { authRouter } from "./auth.routes";
import { clinicRouter } from "./clinic.routes";
import { medicineRouter } from "./medicine.routes";
import { userRouter } from "./user.routes";
import { warehouseRouter } from "./warehouse.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/clinics", clinicRouter);
apiRouter.use("/warehouses", warehouseRouter);
apiRouter.use("/medicines", medicineRouter);

