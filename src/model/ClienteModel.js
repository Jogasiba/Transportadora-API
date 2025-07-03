import { DataTypes } from "sequelize";
import banco from "../../server.js";

// Definindo tabela de Clientes
export default banco.define(
    'clientes',
    {
        cliente_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        endereco_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }
);