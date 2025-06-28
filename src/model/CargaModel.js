import { DataTypes } from "sequelize";
import banco from "../../server.js";

export default banco.define(
    'carga',
    {
        carga_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        origem: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        destino: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        peso: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo_carga: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email_cliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        endereco_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
);