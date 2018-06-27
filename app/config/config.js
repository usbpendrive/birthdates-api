'use strict';

module.exports = () => ({
    app: {
        name: process.env.APP_NAME,
        port: process.env.APP_PORT || 8000,
        environment: process.env.APPLICATION_ENV,
        logpath: process.env.LOG_PATH,
    },
    mongo: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_DATABASE,
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    },
});