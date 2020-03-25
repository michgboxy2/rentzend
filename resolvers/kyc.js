import fs from 'fs';
import {isAuthenticated} from './authorization';
import {combineResolvers} from 'graphql-resolvers';


export default {
    Query: {
        files: async (parent, args, {models}) => {
            return await models.Kyc.findAll({});
        },

        file: async (parent, args, {model, me}) => {
            return await models.Kyc.find({where : {userId : me.id}});
        }
    },

    Mutation: {
        singleUpload: combineResolvers(
            isAuthenticated,
            async (parent, args, {models,me}) => {
                return args.file.then(async file => {
    
                    
                  const {createReadStream, filename, mimetype, encoding} = file
          
                  const fileStream = createReadStream();
    
    
                  fileStream.pipe(fs.createWriteStream(process.cwd()+`/uploads/${filename}`));
    
                  await models.Kyc.create({
                      agendId : me.id,
                      filename,
                      mimetype,
                      encoding
                  });
          
                  return { filename, mimetype, encoding };
                });
              }
        )
    }
}