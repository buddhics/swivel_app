import { AppDataSource } from "./data-source";
import { Employee } from "./entity/Employee";
import * as employeesData from "./employees.json";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { param, checkSchema, validationResult } from "express-validator";
import { validationSchema } from "./validation-schema";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new employees into the database...");

    for (const employeeData of employeesData) {
      const employee = new Employee();
      employee.first_name = employeeData.first_name;
      employee.last_name = employeeData.last_name;
      employee.email = employeeData.email;
      employee.number = employeeData.number;
      employee.gender = employeeData.gender;
      employee.photo = employeeData.photo;
      await AppDataSource.manager.save(employee);
    }

    console.log("Data insertion finished successfully...");

    // create and setup express app
    const app = express();

    // const allowedOrigins = ["http://localhost:3000"];

    // const options: cors.CorsOptions = {
    //   origin: allowedOrigins,
    // };

    // Then pass these options to cors:
    app.use(cors());

    app.use(express.json());

    // register routes
    app.get(
      "/employee",
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const employees = await AppDataSource.getRepository(Employee).find();
          res.json(employees);
        } catch (error) {
          next(error);
        }
      }
    );

    app.get(
      "/employee/:id",
      param("id").isNumeric().withMessage("id must be a number"),
      async function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const employee = await AppDataSource.getRepository(
            Employee
          ).findOneBy({
            id: Number(req.params.id),
          });

          if (employee == null) {
            throw new AppError(404, "Not Found");
          }

          return res.send(employee);
        } catch (error) {
          next(error);
        }
      }
    );

    app.post(
      "/employee",
      checkSchema(validationSchema),
      async function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const employee = await AppDataSource.getRepository(Employee).create(
            req.body
          );
          const results = await AppDataSource.getRepository(Employee).save(
            employee
          );
          return res.send(results);
        } catch (error) {
          next(error);
        }
      }
    );

    app.put(
      "/employee/:id",
      param("id").isNumeric().withMessage("id must be a number"),
      checkSchema(validationSchema),
      async function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const employee = await AppDataSource.getRepository(
            Employee
          ).findOneBy({
            id: Number(req.params.id),
          });

          if (employee == null) {
            throw new AppError(404, "Not Found");
          }

          AppDataSource.getRepository(Employee).merge(employee, req.body);
          const results = await AppDataSource.getRepository(Employee).save(
            employee
          );
          return res.send(results);
        } catch (error) {
          next(error);
        }
      }
    );

    app.delete(
      "/employee/:id",
      param("id").isNumeric().withMessage("id must be a number"),
      async function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const employee = await AppDataSource.getRepository(Employee).delete(
            Number(req.params.id)
          );

          if (employee == null) {
            throw new AppError(404, "Not Found");
          }

          return res.send(employee);
        } catch (error) {
          next(error);
        }
      }
    );

    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500);
        res.json({
          errors: [
            {
              value: "",
              msg: error.message,
              param: "id",
              location: "",
            },
          ],
        });
      }
    );

    // start express server
    app.listen(3001);
  })
  .catch((error) => console.log(error));
