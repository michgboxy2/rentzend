import {gql} from 'apollo-server-express';

export default gql`
    extend type Query{
        files: [File!]
        file(id: ID!): File

    }

    extend type Mutation {
        Upload(file: Upload!): File!
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
      }
`;