import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    },
);


const models = {
    Agent: sequelize.import('./agent'),
    Kyc: sequelize.import('./Kyc')
}

Object.keys(models).forEach(key => {
    if('associate' in models[key]) {
        models[key].associate(models);
    }
});

export {sequelize};

export default models;