import { DataTypes } from "sequelize";
import banco from "../../server.js";

export default banco.define(
    'caminhao',
    {
        caminhao_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        placa: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        capacidade: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        tp_carroceria: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        motorista_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
);