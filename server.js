import { Sequelize } from 'sequelize';
import 'dotenv/config'

// Conexão com BD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
        timestamps: false,
        freezeTableName: true,
    }
});

export default sequelize;