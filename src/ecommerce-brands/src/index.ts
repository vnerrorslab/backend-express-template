import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { Sequelize } from "sequelize";
import { BrandService } from "./modules/brand/infras/transport/rest/routes";
import { init } from "./modules/brand/infras/repository/dto/brand";
import { BrandUseCase } from "./modules/brand/usecase/brand_usecase";
import { MySQLRepository } from "./modules/brand/infras/repository/mysql_brand_repository";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const sequelize = new Sequelize({
  database: process.env.DB_NAME || '',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  dialect: 'mysql',
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
    console.log('Connection successfully.');
    init(sequelize);

    app.get("/", (req: Request, res: Response) => {
      res.send("200lab Server");
    });

    app.use(express.json());

    const brandService = new BrandService(new BrandUseCase(new MySQLRepository(sequelize)));

    app.use("/v1", brandService.setupRoutes());

    app.listen(port, () => {

      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {

    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
