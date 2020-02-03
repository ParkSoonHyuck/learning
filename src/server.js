import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
server.use(logger("dev"));
server.start({ port: PORT }, () => {
  console.log(`현재 http://localhost:${PORT}`);
});
