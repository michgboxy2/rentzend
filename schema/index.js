import {gql} from 'apollo-server-express';
import agentSchema from './agent';
import kycSchema from './kyc';



const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, agentSchema, kycSchema];