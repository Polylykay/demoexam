import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "rootuser",
    password: "password",
    database: "db",
    synchronize: true,
    logging: true,
    entities: [User],
})
