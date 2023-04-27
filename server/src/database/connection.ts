import { createConnection } from "typeorm";
import { Shows, Users } from "../entities";

export default async function connectToDB() {
  await createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.HOST,
    url: process.env.DB_HOST_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Users, Shows],
  });
}
