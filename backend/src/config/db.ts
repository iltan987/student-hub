import { Sequelize } from 'sequelize-typescript';

// Create the Sequelize instance using environment variables or default values
const sequelize = new Sequelize(
    {
        database: process.env.DB_NAME || 'student_hub',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: 'mysql',
        models: [__dirname + '/../models'],
    },
);

export default sequelize;