'use strict';

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;

const createTransports = function (config) {
    const customTransports = [];

    if (config.file) {
        customTransports.push(
            new transports.File({
                filename: config.file,
                level: config.level
            })
        );
    }

    if (config.console) {
        customTransports.push(
            new transports.console({
                level: config.level
            })
        );
    }

    return customTransports;
};

module.exports = {
    create: function (config) {
        return new createLogger({
            transports: createTransports(config),
            format: combine(
                label({label: 'Birthdates API'}),
                timestamp(),
                prettyPrint()
            )
        });
    }
};