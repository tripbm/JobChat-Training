import express from 'express'
import bodyParser  from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/api/graphql/schema/schema';
import resolvers from './src/api/graphql/resolvers/resolvers';

import userRepo from './src/api/graphql/datasources/userRepo';

const config = require('./src/config/index');
const port = config.server.port;
const app = express();
//connect DB
require('./src/database/db');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// public
app.use(express.static(__dirname + '/public'));

const server = new ApolloServer({
    introspection : true,
    typeDefs,
    resolvers,
    formatError: error => {
        return error
    },
    context : () => {
        return  {
            user: new userRepo()
        }
    }
})

server.applyMiddleware({app,path : '/graphql'})

app.listen(port,() => {
    console.log(`app is listening to port ${port}`);
})