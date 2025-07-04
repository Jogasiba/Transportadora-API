import { DataTypes } from "sequelize";
import banco from "../../server.js";

// Definindo tabela de Motoristas
export default banco.define(
    'motorista',
    {
        motorista_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        cnh: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contato: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        endereco_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        caminhao_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
);