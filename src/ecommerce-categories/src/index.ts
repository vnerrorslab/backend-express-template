import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { Sequelize } from "sequelize";
import { init } from "./modules/category/infras/repository/dto/category";
import { CategoryService } from "./modules/category/infras/transport/rest/routes";
import { CategoryUseCase } from "./modules/category/usecase/category_usecase";
import { MySQLRepository } from "./modules/category/infras/repository/mysql_category_repository";

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

    const categoryService = new CategoryService(new CategoryUseCase(new MySQLRepository(sequelize)));

    app.use("/v1", categoryService.setupRoutes());

    app.listen(port, () => {

      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {

    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
