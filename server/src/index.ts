import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import schema from "./schema";
import { Shows, Users } from "./entities";
import * as dotenv from "dotenv";
import connectToDB from "./database/connection";
import compression from "compression";

(async () => {
  dotenv.config({ path: ".env" });

  connectToDB();
  const app = express();
  app.use(
    compression({
      level: 6,
    })
  );
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
