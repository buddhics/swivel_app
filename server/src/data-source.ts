import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee } from "./entity/Employee";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "employee.db",
  synchronize: true,
  logging: true,
  entities: [Employee],
});
