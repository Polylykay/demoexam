import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();
const port = 3050;

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    // Создание нового пользователя
    app.post("/create/user", async (req: Request, res: Response) => {
      try {
        const { login, password } = req.body;
        // Проверяем, существует ли пользователь с таким логином
        const existingUser = await AppDataSource.manager.findOne(User, {
          where: { login },
        });
        // Если пользователь существует, возвращаем ошибку
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "User with this login already exists" });
        }
        // Создаем нового пользователя
        const newUser = new User();
        newUser.login = login;
        newUser.password = password;
        newUser.role = "user";
        // Сохраняем пользователя в базе данных
        await AppDataSource.manager.save(newUser);
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/users", async (req: Request, res: Response) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Добавляем маршрут для получения пользователя по login
    app.post("/auth", async (req: Request, res: Response) => {
      try {
        const { login, password } = req.body;

        // Проверяем, что login и password были переданы
        if (!login || !password) {
          return res
            .status(400)
            .json({ error: "Login and password are required" });
        }

        // Ищем пользователя в базе данных по его login и password
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { login, password },
          select: ["role"],
        });

        // Если пользователь найден, отправляем его в ответе
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
