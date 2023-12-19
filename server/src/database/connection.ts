import { createConnection } from "typeorm";
import { Shows, Users, VerificationCode } from "../entities";

export default async function connectToDB() {
  await createConnection({
    type: "postgres",
    database: process.env.POSTGRES_DB,
    host: "localhost",
    port: 5432,
    url: process.env.DB_HOST_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Users, Shows, VerificationCode],
  });
}
