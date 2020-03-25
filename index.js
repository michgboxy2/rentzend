import 'dotenv/config';
import cors from 'cors';
import uuidvd from 'uuid/v4';
import express from 'express';
import {ApolloServer, AuthenticationError, gql} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import http from 'http';

import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());

app.use((err, req, res, next) => {
	console.log(err);
	return res.status(500).json(err);
	next();
});


const getMe = async req => {
    const token = req.headers['x-token'];

    if(token){
        try{
          return await jwt.verify(token, process.env.SECRET);
        }catch(e){
            throw new AuthenticationError('Your session expired, sign in again');
        }
    }
};



const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({req, connection}) => {
        if(connection){ //handles subscription
            return {
                models
            };
        }
  
        if(req) { //handles mutations and queries
          const me = await getMe(req);
  
          return {
          models,
          me,
          secret: process.env.SECRET,
          }
  
        }
  
    }
});

server.applyMiddleware({app, path: '/graphql'});

const httpServer = http.createServer(app);



sequelize.sync().then(async () => {
    httpServer.listen(PORT, () => {
        console.log(`server started at ${PORT}`)
    });
})





