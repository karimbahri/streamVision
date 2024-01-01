import { createConnection } from "typeorm";
import { Shows, Users, VerificationCode } from "../entities";

export default async function connectToDB() {
  await createConnection({
    type: "postgres",
    database: "streamvision_db",
    host: "localhost",
    url: "postgres://root:password@db:5432/streamvision_db",
    /*url: process.env.DATABASE_URL,*/
    port: 5432,
    username: "root",
    password: "password",
    logging: true,
    synchronize: true,
    entities: [Users, Shows, VerificationCode],
  });
}
