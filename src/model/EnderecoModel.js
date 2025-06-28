import { DataTypes } from "sequelize";
import banco from "../../server.js";

export default banco.define(
    'endereco',
    {
        endereco_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        cep: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        complemento: {
            type: DataTypes.STRING(5),
            allowNull: false,
        }
    }
);