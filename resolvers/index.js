import {GraphQLDateTime} from 'graphql-iso-date';
import agentResolver from './agent';
import kycResolver from './kyc';

const customScalarResolver = {
    Date: GraphQLDateTime
}

export default [customScalarResolver, agentResolver, kycResolver];