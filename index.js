import 'dotenv/config';
import cors from 'cors';
import uuidvd from 'uuid/v4';
import express from 'express';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());


const server = new ApolloServer({});

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})


