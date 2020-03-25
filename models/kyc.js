const kyc = (sequelize, DataTypes) => {
    const Kyc = sequelize.define('Kyc', {
        filename: {
            type: DataTypes.STRING
        },
        mimetype: {
            type: DataTypes.STRING
        },

        encoding: {
            type: DataTypes.STRING
        }
    });

    Kyc.associate = models => {
        Kyc.belongsTo(models.Agent);
    };

    return Kyc;
};

export default kyc;