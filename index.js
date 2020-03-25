import 'dotenv/config';
import cors from 'cors';
import uuidvd from 'uuid/v4';
import express from 'express';
import {ApolloServer, AuthenticationError, gql} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import http from 'http';

// import schema from './schema';
// import resolvers from './resolvers';
// import models, {sequelize} from './models';

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());

const schema = gql`
    type Query {

        users: [User!]
        
    }


    type User {
        id: ID!
        username: String!
        messages: [Message!]
    }


    
`;

const resolvers = {
    Query: {
        users: () => {
            return Object.values(users);
        },
    },

    Mutation: {
        createMessage: (parent, {text}, {me}) => {
            const id = uuidv4();
            const message = {
                id,
                text,
                userId: me.id
            };

            messages[id] = message;
            users[me.id].messageIds.push(id);

            return message;
        },

        deleteMessage: (parent, {id}) => {
            const {[id] : message, ...otherMessages} = messages;

            if(!message){
                return false;
            }

            message = otherMessages;

            return true;
        },

        updateMessage: (parent, {text, id}, {me}) => {
            let message = messages[id];
            if(!message){
                return false;
            }
            message.text = text;

            messages[id] = message;
            

            return message;
        }
    },

    Message: {
        user: (message) => { return users[message.userId]}
    },

    User: {
        username: parent => {
            return parent.username;
        },
        messages: user => {
            return Object.values(messages).filter(
                message => message.userId === user.id
            )
        }
    }
}


const server = new ApolloServer({
    typeDefs: schema,
    resolvers
});

server.applyMiddleware({app, path: '/graphql'});

const httpServer = http.createServer(app);




httpServer.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})


