import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import resolvers from "./resolvers";
import { join } from "path";

const server = new ApolloServer({
    typeDefs: importSchema(join(__dirname, "schema/index.graphql")),
    resolvers,
});

const PORT = 4000;

server
    .listen({
        port: PORT,
    })
    .then(() => console.log(`Apollo server is running on ${PORT}...`));
