import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';


const createToken = async (agent, secret, expiresIn) => {
    const {id} = agent;
    return await jwt.sign({id}, secret, {expiresIn});
}


export default {
    Query: {
        me: async (parent, args, {models, me}) => {
            if(!me){ return null}

            return await models.Agent.findByPK(me.id);
        },

        agent: async (parent, {id}, {models}) => {
            return await models.Agent.findByPK(id);
        },

        agents: async (parent, args, {models}) => {
            return await models.Agent.findAll();
        }
        
    },

    Mutation: {
        signUp: async (parent, {name, email, phoneNumber, address, zipCode, password}, {models, secret}) => {
            const agent = await models.Agent.create({
                name,
                email,
                phoneNumber,
                address,
                zipCode,
                password,
                verified: "false"
            });

            return {token: createToken(agent, secret, '120m')};
        },

        signIn: async (parent, {email, password}, {models, secret}) => {
            const agent = await models.Agent.findByLogin(email);

            if(!agent){
                throw new UserInputError('Agent not found with such credentials');
            };

            const isValid = await agent.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
              }
              return { token: createToken(agent, secret, '120m')};
        }

    },
    
    Agent: {
        files: async (agent, args, {models}) => {
            return await models.Kyc.findAll({
                where: {
                    agentId: agent.id
                }
            })
        }
    }
}