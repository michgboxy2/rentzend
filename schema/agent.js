import {gql} from 'apollo-server-express';

export default gql`
    extend type Query{
        me: Agent
        agent(id: ID!); Agent
        agents: [Agent!]
    }

    extend type Mutation {
        signUp(
            name: String!
            email: String!
            phoneNumber: Integer!
            address: String!
            zipCode: String!
            password: String!
            verified: Boolean!
        ) : Token!

        signIn(email: String!, password: String!) : Token!

    }

    type Token {
        token: String!
    }

    type Agent {
        id: ID!
        name: String!
        email: String!
        phoneNumber: Integer!
        address: String!
        zipCode: String!
        verified: Boolean!
    }
`;