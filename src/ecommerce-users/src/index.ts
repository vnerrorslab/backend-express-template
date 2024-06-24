import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { Sequelize } from "sequelize";
import { UserService } from "./modules/user/infras/transport/rest/routes";
import { init } from "./modules/user/infras/repository/dto/user";
import { UserUseCase } from "./modules/user/usecase/user_usecase";
import { MySQLRepository } from "./modules/user/infras/repository/mysql_user_repository";

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

    const userService = new UserService(new UserUseCase(new MySQLRepository(sequelize)));

    app.use("/v1", userService.setupRoutes());

    app.listen(port, () => {

      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {

    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
