import { DataTypes } from "sequelize";
import banco from "../../server.js";

// Definindo tabela de Despachos
export default banco.define(
    'despacho',
    {
        despacho_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        dt_inic: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dt_fim: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cidade_despacho: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        carga_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        motorista_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
);