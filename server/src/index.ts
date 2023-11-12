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

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("server running on port " + port);
  });
})().catch((err) => console.log("ERROR: ", err));
