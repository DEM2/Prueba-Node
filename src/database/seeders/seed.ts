import "dotenv/config";
import { sequelize } from "../../config/database";
import { initModels } from "../../models";
import { Clinic } from "../../models/clinic.model";
import { Medicine } from "../../models/medicine.model";
import { Request, RequestStatus } from "../../models/request.model";
import { User } from "../../models/user.model";
import { Warehouse } from "../../models/warehouse.model";
import { hashPassword } from "../../utils/password";

const seed = async () => {
  initModels();
  await sequelize.authenticate();
  await sequelize.sync();

  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@example.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin123*";
  const adminName = process.env.ADMIN_NAME ?? "Administrador";

  const adminHash = await hashPassword(adminPassword);
  const gestorHash = await hashPassword("Gestor123*");

  await sequelize.transaction(async (transaction) => {
    const [admin] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: adminName,
        email: adminEmail,
        password: adminHash,
        role: "ADMIN"
      },
      transaction
    });
    await admin.update(
      { name: adminName, password: adminHash, role: "ADMIN" },
      { transaction }
    );

    const [gestor] = await User.findOrCreate({
      where: { email: "gestor@example.com" },
      defaults: {
        name: "Gestor de Solicitudes",
        email: "gestor@example.com",
        password: gestorHash,
        role: "GESTOR"
      },
      transaction
    });
    await gestor.update(
      {
        name: "Gestor de Solicitudes",
        password: gestorHash,
        role: "GESTOR"
      },
      { transaction }
    );

    const clinicData = [
      { name: "Clínica Central", address: "Calle 10 # 20-30, Bogotá" },
      { name: "Clínica del Norte", address: "Carrera 45 # 120-15, Bogotá" },
      { name: "Centro Médico San José", address: "Avenida 6 # 18-42, Cali" }
    ];
    const clinics: Clinic[] = [];
    for (const data of clinicData) {
      const [clinic] = await Clinic.findOrCreate({
        where: { name: data.name },
        defaults: { ...data, isDeleted: false },
        transaction
      });
      clinics.push(clinic);
    }

    const warehouseData = [
      { name: "Bodega Principal", address: "Zona Industrial, Bogotá" },
      { name: "Bodega Occidente", address: "Parque Industrial, Medellín" }
    ];
    const warehouses: Warehouse[] = [];
    for (const data of warehouseData) {
      const [warehouse] = await Warehouse.findOrCreate({
        where: { name: data.name },
        defaults: { ...data, isDeleted: false },
        transaction
      });
      warehouses.push(warehouse);
    }

    const medicineData = [
      { name: "Acetaminofén 500 mg", description: "Analgésico y antipirético", stock: 500 },
      { name: "Ibuprofeno 400 mg", description: "Analgésico antiinflamatorio", stock: 300 },
      { name: "Amoxicilina 500 mg", description: "Antibiótico de amplio espectro", stock: 180 },
      { name: "Loratadina 10 mg", description: "Antihistamínico", stock: 250 },
      { name: "Omeprazol 20 mg", description: "Protector gástrico", stock: 220 }
    ];
    const medicines: Medicine[] = [];
    for (const data of medicineData) {
      const [medicine] = await Medicine.findOrCreate({
        where: { name: data.name },
        defaults: { ...data, isDeleted: false },
        transaction
      });
      medicines.push(medicine);
    }

    const requestData: Array<{
      clinic: number;
      medicine: number;
      warehouse: number;
      quantity: number;
      status: RequestStatus;
      notes: string;
    }> = [
      { clinic: 0, medicine: 0, warehouse: 0, quantity: 50, status: "PENDIENTE", notes: "Seed: abastecimiento semanal" },
      { clinic: 1, medicine: 1, warehouse: 0, quantity: 30, status: "APROBADA", notes: "Seed: inventario bajo" },
      { clinic: 2, medicine: 2, warehouse: 1, quantity: 20, status: "EN_PROCESO", notes: "Seed: entrega prioritaria" },
      { clinic: 0, medicine: 3, warehouse: 1, quantity: 40, status: "COMPLETADA", notes: "Seed: solicitud entregada" },
      { clinic: 1, medicine: 4, warehouse: 0, quantity: 25, status: "RECHAZADA", notes: "Seed: stock suficiente en clínica" },
      { clinic: 2, medicine: 0, warehouse: 1, quantity: 60, status: "CANCELADA", notes: "Seed: solicitud cancelada por la clínica" }
    ];

    for (const data of requestData) {
      await Request.findOrCreate({
        where: { notes: data.notes },
        defaults: {
          clinicId: clinics[data.clinic].id,
          medicineId: medicines[data.medicine].id,
          warehouseId: warehouses[data.warehouse].id,
          quantity: data.quantity,
          status: data.status,
          requestedByUserId: gestor.id,
          notes: data.notes,
          isDeleted: false
        },
        transaction
      });
    }
  });

  console.log("Seed completed:");
  console.log(`ADMIN -> ${adminEmail}`);
  console.log("GESTOR -> gestor@example.com (password: Gestor123*)");
  console.log("3 clinics, 2 warehouses, 5 medicines and 6 requests ready");
};

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
