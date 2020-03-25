import bcrypt from "bcrypt";
import {ValidationError} from 'apollo-server-express';

const agent = (sequelize, DataTypes) => {
    const Agent = sequelize.define("agent", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },

        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                not: true,

            }
        },

        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        zipCode: {
            type: DataTypes.STRING
        },

        verified: {
            type: DataTypes.ENUM,
            values: ["true", "false"],
            defaultValue: "false"

        }
    });

    Agent.associate = models => {
        Agent.hasOne(models.Kyc, {onDelete: "CASCADE"});
    };

    Agent.findByLogin = async email => {
        let agent = await Agent.findOne({
            where: {email}
        });

        if(!email){
            throw new ValidationError("Enter email and password");
        }

        return agent;
    };

    Agent.beforeCreate(async agent => {
        agent.password = await agent.generatePasswordHash();
    });

    Agent.prototype.generatePasswordHash = async function(){
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    };

    Agent.prototype.validatePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return Agent;
}

export default agent;
