import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { Sequelize } from "sequelize";
import { init } from "./modules/product/infras/repository/dto/product";
import { ProductUseCase } from "./modules/product/usecase/product_usecase";
import { MySQLRepository } from "./modules/product/infras/repository/mysql_product_repository";
import { ProductService } from "./modules/product/infras/transport/rest/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully.");
    init(sequelize);

    app.get("/", (req: Request, res: Response) => {
      res.send("200lab Server");
    });

    app.use(express.json());

    const productService = new ProductService(
      new ProductUseCase(new MySQLRepository(sequelize))
    );

    app.use("/v1", productService.setupRoutes());

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
