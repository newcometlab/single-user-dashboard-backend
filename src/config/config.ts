import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.JWT_SECRET)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_DATABASE)

export const config = {
    jwtSecret: process.env.JWT_SECRET ?? '123456',
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: process.env.DB_SSL_CA ? {
            rejectUnauthorized: true,
            ca: process.env.DB_SSL_CA
        } : false,
    },
    port: process.env.PORT || 5000,
};
