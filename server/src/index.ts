import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import schema from "./schema";
import { Shows, Users } from "./entities";
import * as dotenv from "dotenv";

(async () => {
  dotenv.config({ path: ".env" });

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
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen("8080", () => {
    console.log("server running on port 8080");
  });
})().catch((err) => console.log("ERROR: ", err));
