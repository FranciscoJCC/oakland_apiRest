require('dotenv').config();

const CONFIG = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    dbUser : process.env.MYSQL_USER,
    dbPassword: process.env.MYSQL_ROOT_PASSWORD,
    dbHost: process.env.MYSQL_HOST,
    dbPort: process.env.MYSQL_PORT,
    dbName: process.env.MYSQL_DATABASE,
    TZ: process.env.TZ,
    JwtSecret: process.env.JWT_SECRET
}

module.exports = { CONFIG };